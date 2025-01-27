import express from "express";
const router=express();
import userRouter from "./v1/userRouter.js";
import courseRouter from "./v1/courseRouter.js"
import mediaRouter from "./v1/mediaRouter.js"

router.use('/v1/user',userRouter);
router.use('/v1/course',courseRouter);
router.use('/v1/media',mediaRouter);
export default router;