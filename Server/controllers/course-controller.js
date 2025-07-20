import { query } from "express";
import { Lecture } from "../models/lecture.js";
import { CourseService } from "../services/course-service.js";

const courseService = new CourseService();
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
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
    return res.status(201).json({
      success: true,
      message: "course created",
      course: course,
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
export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await courseService.getPublishedCourses();
    if (!courses) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to get published course",
      err: error,
    });
  }
};
export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await courseService.getCourseByCreator({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Course not found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to get creator course",
      err: error,
    });
  }
};
export const editCourse = async (req, res) => {
  try {
    const data = req.body;
    const editData = {};
    if (data.courseTitle) editData.courseTitle = data.courseTitle;
    if (data.subTitle) editData.subTitle = data.subTitle;
    if (data.description) editData.description = data.description;
    if (data.category) editData.category = data.category;
    if (data.courseLevel) editData.courseLevel = data.courseLevel;
    if (data.coursePrice) editData.coursePrice = data.coursePrice;
    const thumbnail = req.file;
    const courseId = req.params.courseId;
    const response = await courseService.editCourse(
      editData,
      thumbnail,
      courseId
    );
    return res.status(200).json({
      response,
      message: "Course Updated Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to edit course",
      err: error,
    });
  }
};
export const getCourseById = async (req, res) => {
  try {
    
    
    const course = await courseService.getCourseById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to get course by Id",
      err: error,
    });
  }
};
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    const response = await courseService.createLecture(courseId, lectureTitle);
    if (!response) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    return res.status(201).json({
      response,
      message: "Lecture Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to create lecture",
      err: error,
    });
  }
};
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseService.getCourseLecture(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course Not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to get course lecture",
      err: error,
    });
  }
};
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await courseService.editLecture({
      lectureTitle,
      videoInfo,
      isPreviewFree,
      courseId,
      lectureId,
    });
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not Found",
      });
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to update lecture",
      err: error,
    });
  }
};
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await courseService.removeLecture(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to remove lecture",
      err: error,
    });
  }
};
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await courseService.getLectureById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to get lecture",
      err: error,
    });
  }
};
//Publish or unpublish the course
export const toggleTheCourseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseService.toggleTheCourseStatus(
      courseId,
      req.query.publish
    );
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${statusMessage}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to Publish or unpublish the course",
      err: error,
    });
  }
};

//search functionality
export const searchCourses = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    const searchingCriterias = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } }, //regex->if any substring matches from courseTitle,options->caseInsensitive
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    //check if categories are applied

    if (categories.length > 0) {
      searchingCriterias.category = { $in: categories };
    }
    // define sorting order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = -1; //sort by price in ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = 1; // descending
    }
    
    const courses = await courseService.findCourseWithFilterAndSort({
      searchingCriterias,
      sortOptions,
    });
    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to search courses",
      err: error,
    });
  }
};
