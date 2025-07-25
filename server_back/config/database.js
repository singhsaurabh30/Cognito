import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";


export const connect=async()=>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database Connected");
        
    } catch (error) {
        console.log("Error Occured",error);
        
    }
    
}