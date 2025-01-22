import { CourseService } from "../services/course-service.js";

const courseService = new CourseService();
export const createCourse = async (req, res) => {
  try {
    const {courseTitle,category}=req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "something missing",
        err: {},
      });
    }
    
    const course = await courseService.createCourse({
      courseTitle,
      category,
      creator: req.id,
    });
    console.log("here");
    return res.status(201).json({
      success: true,
      message: "course created",
      user: course,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to create course",
      err: error,
    });
  }
};
