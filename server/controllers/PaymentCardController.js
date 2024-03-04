import Stripe from 'stripe'
import User from '../models/User.js';
import PaymentCard from '../models/PaymentCard.js';

const stripe = new Stripe(`sk_test_51MtaX3EaztW7P3dwiX6ijhW1VXF93l6EgYzsC21gLAXpJw8t6vHHtwbok51jDdsyHNmyZ4KtPAngLVbQX1kNquF600xjb72Rkx`)

const createCardHandler = async (req, res) => {
    try {
        const { userID } = req.body;
        const findUser = await User.findById(userID);
        const isCardAlreadyExists = await PaymentCard.findOne({ userID: userID });
        if (!findUser) {
            return res.status(404).json({ message: "User Doesn't Exist With This Email" })
        }
        if (isCardAlreadyExists) {
            return res.status(400).json({ message: "You can add only one card to your account" })
        }
        const customer = await stripe.customers.create({
            email: findUser.email.toString(),
            source: req.body.tokenID,
        })
        const attachPayment = await stripe.paymentMethods.attach(req.body.payment_method, {
            customer: customer.id,
        })
        const createCard = new PaymentCard({
            userID: findUser._id,
            tokenID: req.body.tokenID,
            customerID: customer.id,
            paymentMethodID: req.body.payment_method,
            attachPaymentID: attachPayment.id
        })
        await createCard.save();
        res.status(200).json({ createCard, message: "Card Saved Successfully" })
        console.log(attachPayment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const getCardDetails = async (req, res) => {
    try {
        const { userID } = req.params;
        const findUser = await User.findById(userID);
        if (!findUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const findCardPayment = await PaymentCard.findOne({ userID: userID })
        if (!findCardPayment) {
            return res.status(404).json({ message: "No Card Added Yet" })
        }
        const customer = await stripe.customers.retrieve(findCardPayment.customerID);
        const paymentMethod = await stripe.paymentMethods.retrieve(findCardPayment.attachPaymentID);

        res.status(200).json({ customer, paymentMethod })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const getStripeDetails = async (req, res) => {
    try {
        const { userID } = req.params;
        const findUser = await User.findById(userID);
        if (!findUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        if (!findUser.role.includes("SuperAdmin")) {
            return res.status(400).json({ message: "Unauthorized Request" })
        }
        const balance = await stripe.balance.retrieve()
        res.status(200).json({ balance })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { createCardHandler, getCardDetails, getStripeDetails }