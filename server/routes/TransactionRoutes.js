import express from "express";
import { HandlePayToInfluencer } from "../controllers/TransactionController.js";

const router = express.Router();

router.post("/:brandID/send-payment/:influencerID", HandlePayToInfluencer)


// senderID: {
//     type: Schema.Types.ObjectId,
//     ref: "users",
// },
// receiverID: {
//     type: Schema.Types.ObjectId,
//     ref: "users",
// },
// amount: {
//     type: Number,
//     require: true
// },

export default express 