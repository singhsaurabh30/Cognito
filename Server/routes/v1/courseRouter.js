import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createCourse, editCourse, getCourseById, getCreatorCourse } from "../../controllers/course-controller.js";
import { upload } from "../../utils/multer.js";

const router=express();


router.post('/',isAuthenticated,createCourse);
router.get('/',isAuthenticated,getCreatorCourse);
router.put('/:courseId',isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.get('/:courseId',isAuthenticated,getCourseById);
export default router;