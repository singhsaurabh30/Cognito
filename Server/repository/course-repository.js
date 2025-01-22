import { Course } from "../models/course.js";

export class CourseRepository{
    async create(data){
        try {
            const course=await Course.create(data);
            return course;
        } catch (error) {
            console.log("something went wrong in repository while creating course");
            throw(error);
        }
    } 
}