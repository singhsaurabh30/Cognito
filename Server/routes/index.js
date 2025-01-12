import express from "express";
const router=express();
import userRouter from "./v1/userRouter.js";


router.use('/v1/user',userRouter);
export default router;