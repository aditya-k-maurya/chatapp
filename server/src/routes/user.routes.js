import { Router } from "express";
import { signUp } from "../controller/user.controller.js";

const router = Router();

// signup route
router.route("/signUp").post(signUp);

export default router