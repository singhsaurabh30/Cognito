import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createCheckOutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../../controllers/coursePurchase-controller.js";
const router=express();

router.post('/checkout/create-checkout-session',isAuthenticated,createCheckOutSession);
router.post('/webhook',express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated,getAllPurchasedCourse);

export default router;