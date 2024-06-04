import { Users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(400, "Both email and password is required.");
	}

	const user = await Users.findOne({ email });
	if (!user) {
		throw new ApiError(400, "Email doesn't exists.");
	}

	const verifyPassword = await bcryptjs.compare(password, user.password);

	if (!verifyPassword) {
		throw new ApiError(400, "Invalid credientials");
	}

	const tokenData = {
		id: user._id,
		email: user.email,
	};

	const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
		expiresIn: "1d",
	});

	const cookiesOption = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("token", token, cookiesOption)
		.json(200, token, "user logged in successfully");
});

const logout = asyncHandler(async (req, res) => {
	const token = req.cookies.token;
	if (token) {
		console.log(token);
	}

	return res
		.clearCookie("token")
		.status(200)
		.json(new ApiResponse(200, "", "logout successfully"));
});

const updateUserName = asyncHandler(async (req, res) => {
	const user = req.user;
	const { name } = req.body;

	console.log(user);
	const updateUser = await Users.updateOne(
		{ _id: user._id },
		{
			name,
		}
	);

	const userInformation = await Users.findById(user._id);
	res
		.status(200)
		.json(
			new ApiResponse(200, userInformation, "User name updated successfully")
		);
});

const updateUserProfile_pic = asyncHandler(async (req, res) => {
	const { user } = req.user;
	const { profile_pic } = req.body;

	const updateUser = await Users.updateOne(
		{ _id: user._id },
		{
			profile_pic,
		}
	);

	const userInformation = await Users.findById(user._id);
	res
		.status(200)
		.json(
			new ApiResponse(
				200,
				userInformation,
				"User profile pic updated successfully"
			)
		);
});

export { signUp, login, logout, updateUserName, updateUserProfile_pic };
