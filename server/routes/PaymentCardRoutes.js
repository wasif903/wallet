import express from "express";
import { createCardHandler, getCardDetails } from "../controllers/PaymentCardController.js";


const router = express.Router();


router.post('/create-payment-method', createCardHandler)
router.get('/get-payment-method/:userID', getCardDetails)


export default router