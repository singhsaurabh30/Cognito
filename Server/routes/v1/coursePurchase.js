import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createCheckOutSession, stripeWebhook } from "../../controllers/coursePurchase-controller.js";
const router=express();

router.post('/checkout/create-checkout-session',isAuthenticated,createCheckOutSession);
router.post('/webhook',express.raw({type:"application/json"}), stripeWebhook);
export default router;