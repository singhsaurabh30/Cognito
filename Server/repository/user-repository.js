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

}