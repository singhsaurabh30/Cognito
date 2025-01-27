import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";

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
    async getCourseByCreator(data){
        try {
            const courses=await Course.find(data);
            return courses;
        } catch (error) {
            console.log("something went wrong in repository while getting course by creator");
            throw(error);
        }
    }
    async editCourse(id,data){
        try {
            const response=await Course.findByIdAndUpdate(id,data,{new:true});
            return response;
        } catch (error) {
            console.log("something went wrong in repository while editing course");
            throw(error);
        }
    }
    async getCourseById(id){
        try {
            const course=await Course.findById(id);

            return course;
        } catch (error) {
            console.log("something went wrong in repository while finding course");
            throw(error);
        }
    }
    async createLecture(data){
        try {
            const lecture=await Lecture.create(data);
            return lecture;
        } catch (error) {
            console.log("something went wrong in repository while creating lecture");
            throw(error);
        }
    }

    async getCourseLecture(id){
        try {
            const course=await Course.findById(id).populate("lectures");
            return course;
        } catch (error) {
            console.log("something went wrong in repository while getting course lecture");
            throw(error);
        }
    }
    async getLectureById(id){
        try {
            const lecture=await Lecture.findById(id);
            return lecture;
        } catch (error) {
            console.log("something went wrong in repository while getting lecture");
            throw(error);
        }
    }
}