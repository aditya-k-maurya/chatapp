import { Users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const fetchUser = asyncHandler(async (req, res, next) => {
	const token = req.cookies.token;


	if (!token) {
		throw new ApiError(401, "Please authenticate using valid token");
	}

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const userId = new mongoose.Types.ObjectId(data.id);

		const user = await Users.findById(userId);

		req.user = user;
		console.log(user)
		next();
	} catch (error) {
		throw new ApiError(401, "Something went wrong in fetchingData");
	}
});
export default fetchUser;
