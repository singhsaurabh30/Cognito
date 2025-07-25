import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../../controllers/courseProgress-controller.js";

const router=express();
router.get('/:courseId',isAuthenticated,getCourseProgress);
router.post('/:courseId/lecture/:lectureId/view',isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);

export default router;