import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentCard = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    tokenID: {
        type: String,
        require: true
    },
    customerID: {
        type: String,
        require: true
    },
    paymentMethodID: {
        type: String,
        require: true
    },
    attachPaymentID: {
        type: String,
        require: true
    },
}, { timestamps: true });

export default mongoose.model("cards", PaymentCard);
