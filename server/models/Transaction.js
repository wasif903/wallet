import mongoose from 'mongoose';
const { Schema } = mongoose;

const TransactionSchema = new Schema({

    senderID: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    receiverID: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    amount: {
        type: Number,
        require: true
    },
    
}, { timestamps: true });

export default mongoose.model("transactions", TransactionSchema);
