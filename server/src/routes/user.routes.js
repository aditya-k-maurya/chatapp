import { Router } from "express";
import { login, signUp } from "../controller/user.controller.js";

const router = Router();

// signup route
router.route("/signUp").post(signUp);

// login route
router.route('/login').post(login)

export default router