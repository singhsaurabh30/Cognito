import { AUTH_KEY } from "../config/serverConfig.js";
import jwt from "jsonwebtoken"

export const createToken=(data)=>{
    try {
        const jwtToken= jwt.sign({
            email: data.email
        },
        AUTH_KEY
        ,{
            expiresIn: '1d'
        }); 
        return jwtToken;
    } catch (error) {
        console.log('something went wrong while creating token');
        throw error;
    }
}