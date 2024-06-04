import { Router } from "express";
import { login, logout, signUp } from "../controller/user.controller.js";

const router = Router();

// signup route
router.route("/signUp").post(signUp);

// login route
router.route('/login').post(login)

// logout route
router.route('/logout').post(logout)

export default router