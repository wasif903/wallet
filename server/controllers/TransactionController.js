import PaymentCard from "../models/PaymentCard.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Stripe from 'stripe'

const stripe = new Stripe(`sk_test_51MtaX3EaztW7P3dwiX6ijhW1VXF93l6EgYzsC21gLAXpJw8t6vHHtwbok51jDdsyHNmyZ4KtPAngLVbQX1kNquF600xjb72Rkx`)


const HandleInitiateOrder = async (req, res) => {
    try {
        const { brandID, influencerID } = req.params;

        const findBrand = await User.findOne({ _id: brandID, role: 'BrandOwner' });
        if (!findBrand) {
            return res.status(404).json({ message: "Invalid Brand ID" });
        }

        const findInfluencer = await User.findOne({ _id: influencerID, role: 'Influencer' });
        if (!findInfluencer) {
            return res.status(404).json({ message: "Invalid Influencer ID" });
        }

        const createTransaction = new Transaction({
            brandID: findBrand._id,
            influencerID: findInfluencer._id,
            amount: req.body.amount,
        })
        await createTransaction.save();
        res.status(200).json({ message: "Transaction Initiated Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}


const HandlePayToInfluencer = async (req, res) => {
    try {
        const { brandID, influencerID } = req.params;

        const findBrand = await User.findOne({ _id: brandID, role: 'BrandOwner' });

        if (!findBrand) {
            return res.status(404).json({ message: "Invalid Brand ID" })
        }

        const findSuperAdmin = await User.findOne({ role: "SuperAdmin" });
        if (!findSuperAdmin) {
            return res.status(404).json({ message: "Super Admin Doesnt Exists" })
        }

        const findInfluencer = await User.findOne({ _id: influencerID, role: 'Influencer' });
        if (!findInfluencer) {
            return res.status(404).json({ message: "Invalid Influencer ID" })
        }

        const findCard = await PaymentCard.findOne({ userID: findSuperAdmin._id.toString() })

        if (!findCard) {
            return res.status(400).json({ message: "Super Admin Card Not Attached" })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            customer: findCard.customerID,
            amount: Number(500 * 100),
            currency: 'usd',
            payment_method: findCard.attachPaymentID,
            description: `Purchased Service`,
        })
        const paymentIntentConfirm = await stripe.paymentIntents.confirm(
            paymentIntent.id,
            {
                payment_method: findCard.attachPaymentID,
                return_url: 'http://localhost:3000',
            }
        );
        if (paymentIntentConfirm.status !== "succeeded") {
            return res.status(400).json({ message: "Payment Failed" })
        }

        const createTransaction = new Transaction({
            brandID: findBrand._id,
            influencerID: findInfluencer._id,
            amount: 500,
            paymentIntentConfirm: paymentIntentConfirm.id
        })

        await createTransaction.save();

        res.status(200).json({ message: "Payment Sent Successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { HandlePayToInfluencer, HandleInitiateOrder }