import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../../controllers/user-controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { upload } from "../../utils/multer.js";

const router=express();


router.post('/login',login);
router.get('/logout',logout);
router.post('/register',register);
router.get('/profile',isAuthenticated,getUserProfile);
router.put("/profile/update",isAuthenticated, upload.single("profilePhoto"), updateProfile);
export default router;