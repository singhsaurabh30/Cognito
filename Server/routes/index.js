import express from "express";
const router=express();
import userRouter from "./v1/userRouter.js";
import courseRouter from "./v1/courseRouter.js"


router.use('/v1/user',userRouter);
router.use('/v1/course',courseRouter);
export default router;