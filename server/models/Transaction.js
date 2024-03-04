import mongoose from 'mongoose';
const { Schema } = mongoose;

const TransactionSchema = new Schema({

    brandID: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    influencerID: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    paymentIntentConfirm: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        require: true
    },
    status: {
        type: [String],
        enum: ["Pending", "In Progress", "Completed", "Cancelled"],
        default: ["Pending"]
    }

}, { timestamps: true });

export default mongoose.model("transactions", TransactionSchema);
