import { response } from "express";
import { Users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";

const signUp = asyncHandler(async (req, res) => {
	const { name, email, password, profile_pic } = req.body;

	const checkEmail = await Users.findOne({ email });

	if (checkEmail) {
		throw new ApiError(400, "User already exist");
	}

	// password into hashpassword
	const salt = await bcryptjs.genSalt(10);
	const hashpassword = await bcryptjs.hash(password, salt);

	const payload = {
		name,
		email,
		profile_pic,
		password: hashpassword,
	};

	const user = new Users(payload);
	await user.save();

	return res
		.status(201)
		.json(new ApiResponse(201, user, "User created successfully"));
});

export { signUp };
