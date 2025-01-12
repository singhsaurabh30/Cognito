import express from "express";
import { login, register } from "../../controllers/user-controller.js";

const router=express();


router.post('/login',login);
router.post('/register',register);
export default router;