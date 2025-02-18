import { CourseProgress } from "../models/courseProgress.js";
import { CourseService } from "../services/course-service.js";

const courseService = new CourseService();

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;
    const courseDetails = await courseService.getCourseLecture(courseId);
    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    if (!courseDetails) {
      return res.status(404).json({ message: "course not found" });
    }
    if (!courseProgress) {
      return res
        .status(200)
        .json({ courseDetails, progress: [], completed: false });
    }
    console.log(courseProgress);

    return res.status(200).json({
      courseDetails,
      progress: courseProgress.lectureProgress,
      completed: courseProgress.completed,
    });
  } catch (error) {
    console.error("Error handling event:", error);
    return res.status(500).json({ message: "Failed to get course progress" });
  }
};
export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    let courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }
    //find lecture index in lectureProgress array if it is being watched;
    const lectureInd = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    //now if lectureInd===-1 than we dont have lecture in lectureprogress we push it and mark it as completed
    //else we will mark it as completed if not marked
    if (lectureInd !== -1) {
      courseProgress.lectureProgress[lectureInd].viewed = true;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    const lectureViewedLength = courseProgress.lectureProgress.filter(
      (lecture) => lecture.viewed
    ).length;
    const course = await courseService.getCourseById(courseId);
    if (course.lectures.length === lectureViewedLength)
      courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({
      message: "Lecture progress updated successfully.",
    });
  } catch (error) {
    console.error("Error handling event:", error);
    return res
      .status(500)
      .json({ message: "Failed to update lecture progress" });
  }
};
export const markAsCompleted = async (req, res) => {
  try {
    const {courseId}=req.params;
    const userId=req.id;
    const courseProgress=await CourseProgress.findOne({courseId,userId});
    if(!courseProgress){
      return res.status(404).json({ message: "Course progress not found" });
    }
    courseProgress.lectureProgress.map((lecture)=>(lecture.viewed=true)
    );
    courseProgress.completed=true;
    courseProgress.save();
    return res.status(200).json({message:"Course marked as completed"});

  } catch (error) {
    console.error("Error handling event:", error);
    return res
      .status(500)
      .json({ message: "Failed to mark course as completed" });
  }
};
export const markAsInCompleted = async (req, res) => {
  try {
    const {courseId}=req.params;
    const userId=req.id;
    const courseProgress=await CourseProgress.findOne({courseId,userId});
    if(!courseProgress){
      return res.status(404).json({ message: "Course progress not found" });
    }
    courseProgress.lectureProgress.map((lecture)=>(lecture.viewed=false)
    );
    courseProgress.completed=false;
    courseProgress.save();
    return res.status(200).json({message:"Course marked as inCompleted"});

  } catch (error) {
    console.error("Error handling event:", error);
    return res
      .status(500)
      .json({ message: "Failed to mark course as inCompleted" });
  }
};
