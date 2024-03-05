import mongoose from 'mongoose';
const { Schema } = mongoose;

const WalletSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    amount: {
        type: Number,
        require: true
    },

}, { timestamps: true });

export default mongoose.model("wallet", WalletSchema);
