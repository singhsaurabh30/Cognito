import { CourseRepository } from "../repository/course-repository.js";

export class CourseService{
    constructor(){
        this.courseRepository=new CourseRepository();
    }
    async createCourse(data){
        try {
            const course = await this.courseRepository.create(data);
            return course;
          } catch (error) {
            console.log("something went wrong in Course service");
            throw error;
          }
    }
}