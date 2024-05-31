import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "provide name"],
		},
		email: {
			type: String,
			require: [true, "provide email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "password required"],
		},
		profile_pic: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

export const Users = mongoose.model("Users", userSchema);
