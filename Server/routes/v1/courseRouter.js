import express from "express";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourse, getLectureById, getPublishedCourse, removeLecture, searchCourses, toggleTheCourseStatus } from "../../controllers/course-controller.js";
import { upload } from "../../utils/multer.js";

const router=express();


router.post('/',isAuthenticated,createCourse);
router.get("/search",isAuthenticated, searchCourses);
router.get('/',isAuthenticated,getCreatorCourse);
router.route("/published-courses").get( getPublishedCourse);
router.put('/:courseId',isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.get('/:courseId',isAuthenticated,getCourseById);
router.post('/:courseId/lecture',isAuthenticated,createLecture);
router.get('/:courseId/lecture',isAuthenticated,getCourseLecture);
router.post('/:courseId/lecture/:lectureId',isAuthenticated,editLecture);
router.delete('/lecture/:lectureId',isAuthenticated,removeLecture);
router.get('/lecture/:lectureId',isAuthenticated,getLectureById);
router.patch('/:courseId',isAuthenticated,toggleTheCourseStatus);



export default router;