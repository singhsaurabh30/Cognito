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
      if(courseThumbnail) data.courseThumbnail=courseThumbnail.secure_url;
      
      const response = await this.courseRepository.editCourse(courseId,data);
      
      return response;
    } catch (error) {
      console.log("something went wrong in Course service");
      throw error;
    }
  }
  async getCourseById(id){
    try {
      const course=await this.courseRepository.getCourseById(id);
      return course;
    } catch (error) {
      console.log("something went wrong in Course service");
      throw error;
    }
  }
}
