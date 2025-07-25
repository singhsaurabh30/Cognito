import jwt from "jsonwebtoken";
import { AUTH_KEY } from "../config/serverConfig.js";


export const isAuthenticated=async (req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "user not authenticated",
              });
        }
        const tokenPayload=await jwt.verify(token,AUTH_KEY);
        if(!tokenPayload) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
              });
        }
        req.id=tokenPayload.userId;
        next();

    } catch (error) {
        console.log(error);
    }
}