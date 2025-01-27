import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getCreatorCourse } from "../../controllers/course-controller.js";
import { upload } from "../../utils/multer.js";

const router=express();


router.post('/',isAuthenticated,createCourse);
router.get('/',isAuthenticated,getCreatorCourse);
router.put('/:courseId',isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.get('/:courseId',isAuthenticated,getCourseById);
router.post('/:courseId/lecture',isAuthenticated,createLecture);
router.get('/:courseId/lecture',isAuthenticated,getCourseLecture);
export default router;