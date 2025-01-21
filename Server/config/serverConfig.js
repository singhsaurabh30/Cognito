import dotenv from "dotenv";
dotenv.config();


export const PORT=process.env.PORT;
export const MONGO_URL=process.env.MONGO_URL;
export const AUTH_KEY=process.env.AUTH_KEY;
export const CLOUD_NAME=process.env.CLOUD_NAME;
export const API_KEY=process.env.API_KEY;
export const API_SECRET=process.env.API_SECRET;