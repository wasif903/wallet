import express from "express";
import { createCardHandler, getCardDetails, getStripeDetails } from "../controllers/PaymentCardController.js";


const router = express.Router();


router.post('/create-payment-method', createCardHandler)
router.get('/get-payment-method/:userID', getCardDetails)
router.get('/get-stripe-details/:userID', getStripeDetails)


export default router