import express from "express";
import { createCardHandler } from "../controllers/PaymentCardController";


const router = express.Router();


router.post('/create-payment-method', createCardHandler)


export default router