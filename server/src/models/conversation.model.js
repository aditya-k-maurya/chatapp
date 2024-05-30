import mongoose, { Schema, mongo } from "mongoose";

const conversationSchema = new Schema(
	{
		sender: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			require: true,
		},
		receiver: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			require: true,
		},
		messages: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Message",
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
