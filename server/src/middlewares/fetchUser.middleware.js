import { Users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const fetchUser = async (req, res, next) => {
	const token = req.cookie.token;

	if (!token) {
		throw new ApiError(401, "Please authenticate using valid token");
	}

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const user = await Users.findById(data.id);

		req.body.user = user;
		// console.log(data.user)
		next();
	} catch (error) {
		throw new ApiError(401, "Please authenticate using valid token");
	}
};

export default fetchUser;
