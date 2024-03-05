import express from "express";
import { HandleCutFee, HandleInitiateOrder, HandlePayToInfluencer } from "../controllers/TransactionController.js";

const router = express.Router();

router.post("/:brandID/initiate-order/:influencerID", HandleInitiateOrder)

router.post("/:brandID/send-payment/:influencerID", HandlePayToInfluencer)

router.post("/:brandID/cut-fee-pay-influencer/:influencerID", HandleCutFee)


export default router;