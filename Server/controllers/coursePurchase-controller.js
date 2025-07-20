import {
  STRIPE_SECRET_KEY,
  WEBHOOK_ENDPOINT_SECRET,
} from "../config/serverConfig.js";
import { Course } from "../models/course.js";
import { CoursePurchase } from "../models/coursePurchase.js";
import { Lecture } from "../models/lecture.js";
import Stripe from "stripe";
import { getCourseById } from "./course-controller.js";
import { User } from "../models/user.js";
import { CourseService } from "../services/course-service.js";
const courseService = new CourseService();
const stripe = new Stripe(STRIPE_SECRET_KEY);
export const createCheckOutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found" });
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Creating a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });
    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }
    //saving the purchase id
    newPurchase.paymentId = session.id;
    newPurchase.save();
    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL for calling it and proceeding further
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};
export const getCourseDetailWithPurchaseStatus = async (req,res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const course = await courseService.getCourseDetails(courseId);
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }
    const purchased = await CoursePurchase.findOne({ userId, courseId });
    
    return res.status(200).json({
      course,
      purchased: purchased?purchased.status==="completed":false,
    });
  } catch (error) {
    console.error("Error handling event:", error);
    return res.status(500).json({ message: "Failed to get course detail" });
  }
};
export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.error("Error handling event:", error);
    return res.status(500).json({ message: "Failed to get purchased courses" });
  }
};
