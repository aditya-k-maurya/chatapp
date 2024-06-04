import { Router } from "express";
import { login, logout, signUp, updateUserProfile_pic, updateUserName } from "../controller/user.controller.js";
import fetchUser from "../middlewares/fetchUser.middleware.js";

const router = Router();

// signup route
router.route("/signUp").post(signUp);

// login route
router.route('/login').post(login)

// logout route
router.route('/logout').post(logout)

// update user name route
router.route('/updateusername').post(fetchUser,updateUserName)

// update user profile pic route
router.route("/updateuserprofilepic").post(fetchUser, updateUserProfile_pic);


export default router