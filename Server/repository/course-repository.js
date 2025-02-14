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
    async deleteLectureById(id){
        try {
            const lecture=await Lecture.findByIdAndDelete(id);
            return lecture;
        } catch (error) {
            console.log("something went wrong in repository while deleting lecture");
            throw(error);
        }
    }
    async removeLectureFromAssociatedCourse(id){
        try {
            await Course.findOneAndUpdate(
                {lectures:id}, //find course which containes lecture with lectureId as id
                {$pull:{lectures:id}} //remove lectureId from lectures array

            )
        } catch (error) {
            console.log("something went wrong in repository while deleting lecture from course");
            throw(error);
        }
    }
    async getPublishedCourses(){
        try {
            const courses=await Course.find({isPublished:true}).populate({path:"creator",select:"name photoUrl"});
            return courses;
        } catch (error) {
            console.log("something went wrong in repository while deleting lecture from course");
            throw(error);
        }
    }
}

