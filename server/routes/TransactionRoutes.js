import express from "express";
import { HandleInitiateOrder, HandlePayToInfluencer } from "../controllers/TransactionController.js";

const router = express.Router();

router.post("/:brandID/initiate-order/:influencerID", HandleInitiateOrder)

router.post("/:brandID/send-payment/:influencerID", HandlePayToInfluencer)



export default router 







  