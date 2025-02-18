import { CourseRepository } from "../repository/course-repository.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }
  async createCourse(data) {
    try {
      const course = await this.courseRepository.create(data);
      return course;
    } catch (error) {
      console.log("something went wrong in Course service");
      throw error;
    }
  }
  async getCourseByCreator(data) {
    try {
      const course = await this.courseRepository.getCourseByCreator(data);
      return course;
    } catch (error) {
      console.log("something went wrong in Course service");
      throw error;
    }
  }
  async editCourse(data, thumbnail, courseId) {
    try {
      const course = await this.courseRepository.getCourseById(courseId);
      if (!course) throw { message: "Course Not Found" };
      let courseThumbnail;
      if (thumbnail) {
        if (course.courseThumbnail) {
          const publicId = course.courseThumbnail
            .split("/")
            .pop()
            .split(".")[0];
          await deleteMediaFromCloudinary(publicId);
        }
        courseThumbnail = await uploadMedia(thumbnail.path);
      }
      if (courseThumbnail) data.courseThumbnail = courseThumbnail.secure_url;

      const response = await this.courseRepository.editCourse(courseId, data);

      return response;
    } catch (error) {
      console.log("something went wrong in Course service");
      throw error;
    }
  }
  async getCourseById(id) {
    try {
      const course = await this.courseRepository.getCourseById(id);
      return course;
    } catch (error) {
      console.log("something went wrong in Course service while getting course by id");
      throw error;
    }
  }
  async createLecture(id, lectureTitle) {
    try {
      const course = await this.courseRepository.getCourseById(id);
      if (!course) return course;
      const lecture = await this.courseRepository.createLecture({
        lectureTitle,
      });
      course.lectures.push(lecture._id);
      await course.save();
      return lecture;
    } catch (error) {
      console.log("something went wrong in Course service while creating lecture");
      throw error;
    }
  }
  async getCourseLecture(id) {
    try {
      const course = await this.courseRepository.getCourseLecture(id);
      return course;
    } catch (error) {
      console.log("something went wrong in Course service while getting course lecture");
      throw error;
    }
  }
  async editLecture(data) {
    try {
      const lecture = await this.courseRepository.getLectureById(
        data.lectureId
      );
      console.log(data);

      if (!lecture) return lecture;
      if (data.lectureTitle) lecture.lectureTitle = data.lectureTitle;
      if (data.videoInfo?.videoUrl) lecture.videoUrl = data.videoInfo.videoUrl;
      if (data.videoInfo?.publicId) lecture.publicId = data.videoInfo.publicId;
      if (data.isPreviewFree) lecture.isPreviewFree = data.isPreviewFree;
      await lecture.save();
      console.log(lecture);
      const course = await this.courseRepository.getCourseById(data.courseId);
      //ensuring that course has lecture
      if (course && !course.lectures.includes(lecture._id)) {
        course.lectures.push(lecture._id);
        await course.save();
      }
      return lecture;
    } catch (error) {
      console.log("something went wrong in Course service while editing courses");
      throw error;
    }
  }
  async removeLecture(id) {
    try {
      const lecture = await this.courseRepository.deleteLectureById(id);
      if (!lecture) return lecture;
      //delete lecture from cloudinary
      if (lecture.publicId) {
        await deleteMediaFromCloudinary(lecture.publicId);
      }
      await this.courseRepository.removeLectureFromAssociatedCourse(id);
      return lecture;
    } catch (error) {
      console.log(
        "something went wrong in Course service while removing lecture"
      );
      throw error;
    }
  }
  async getLectureById(id) {
    try {
      const lecture = await this.courseRepository.getLectureById(id);
      return lecture;
    } catch (error) {
      console.log(
        "something went wrong in Course service while getting lecture"
      );
      throw error;
    }
  }
  async toggleTheCourseStatus(id, publish) {
    try {
      const course = await this.courseRepository.getCourseById(id);
      if (!course) return course;
      course.isPublished = publish === "true";
      await course.save();
      return course;
    } catch (error) {
      console.log(
        "something went wrong in Course service while toggling course status"
      );
      throw error;
    }
  }
  async getPublishedCourses() {
    try {
      const courses = await this.courseRepository.getPublishedCourses();
      return courses;
    } catch (error) {
      console.log(
        "something went wrong in Course service while getting publish courses"
      );
      throw error;
    }
  }
  async getCourseDetails(id) {
    try {
      const course=await this.courseRepository.getCourseDetailWithCreatorAndLectures(id);
      return course;
    } catch (error) {
      console.log(
        "something went wrong in Course service while getting course details"
      );
      throw error;
    }
  }
  async findCourseWithFilterAndSort({searchingCriterias,sortOptions}){
    try {
      const courses=await this.courseRepository.findCourseWithFilterAndSort({searchingCriterias,sortOptions});
      return courses
    } catch (error) {
      console.log(
        "something went wrong in Course service while searching courses"
      );
      throw error;
    }
  }
}
