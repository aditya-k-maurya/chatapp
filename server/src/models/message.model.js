import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
	{
		text: {
			type: String,
			default: ""
		},
		imageUrl: {
			type: String,
			default: ""
		},
		videoUrl: {
			type: String,
			default: ""
		},
    seen: {
      type: Boolean,
      required: true,
      default: false
    }
	},
	{
		timestamps: true,
	}
);

export const Messages = mongoose.model("Messages", messageSchema);
