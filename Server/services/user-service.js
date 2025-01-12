import { UserRepository } from "../repository/user-repository.js";
import { createToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";



export class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
        try {
            const response=await this.userRepository.getByEmail(data.email);
            if(response){
                throw {
                    message:"user already exist"
                }
            };
            const user=await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service");
            throw error;
        }
    }
    async login(data){
        try {
            const userData=await this.userRepository.getByEmail(data.email);
            if(!userData){
                throw {message: 'either password or email is wrong'};
            }
            const passStatus=await bcrypt.compare(data.password,userData.password); 
            if(!passStatus){
                throw {message: 'either password or email is wrong'};
            }
            const token=createToken({
                email : data.email
            });
            return token;
        } catch (error) {
            console.log('something went wrong while signing in');
            throw error;
        }
    }
}