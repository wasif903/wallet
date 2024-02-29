import Stripe from 'stripe'
import User from '../models/User.js';
import PaymentCard from '../models/PaymentCard.js';

const stripe = new Stripe(`sk_test_51NIBAcI5fPUI3rtcXN5xKVgHbMKlzfZIe8CXlzCcLFImc6H7Ks2lZP3SWElN1UvcgKWxbSgmYB0Sz8zp8G913IIf00wh2wfIGv`)

const createCardHandler = async (req, res) => {
    try {
        const { userID } = req.body;
        const findUser = await User.findById(userID);
        if (!findUser) {
            return res.status(404).json({ message: "User Doesn't Exist With This Email" })
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


export { createCardHandler, getCardDetails }