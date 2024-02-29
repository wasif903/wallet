import Stripe from 'stripe'
import User from '../models/User.js';

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
        console.log(attachPayment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export { createCardHandler }