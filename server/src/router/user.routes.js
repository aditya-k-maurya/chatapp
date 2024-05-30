import { Router } from "express";
import { signUp } from "../controller/user.controller";

const router = Router();

// signup route
router.route("/register").post(signUp);
