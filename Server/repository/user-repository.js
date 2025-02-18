import {User} from "../models/user.js";



export class UserRepository{

    async create(data){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in repository while creating user");
            throw(error);
        }
    }

    async getByEmail(emailId){
        try {
            const userData=await User.findOne({email:emailId});
            return userData;
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw(error);
        }
    }
    async getByUserId(id){
        try {
            const userData=await User.findById(id).populate({path: "enrolledCourses",   // First populate enrolledCourses
                populate: {
                    path: "creator",       // Then populate creator inside enrolledCourses
                    select: "name photoUrl"  // Select specific fields from creator
                }}).select("-password");
            
            return userData;
        } catch (error) {
            console.log('something went wrong in repository layer');
            throw(error);
        }
    }
    async updateUser(id,data){
        try {
            const user=await User.findByIdAndUpdate(id,data,{new:true}).select("-password");
            return user;
        } catch (error) {
            console.log(error);
            
        }
    }

}