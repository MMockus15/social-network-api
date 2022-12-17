const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
	{
		reactionId: {
			type: mongoose.ObjectId,
			default: () => {
				return new mongoose.Types.objectId();
			},
			},
			reactionBody: {
				type: String,
				required: true,
				maxlength: 280,
			},
			username: {
				type: String,
				required: true,
			},
			createdAt: {
				type: Date,
				default: Date.now(),
				// get: formatDate,
			},
		},
		{
			toJSON: {
				getters: true,
		}
	}
);

//getter method
function formatDate(createdAt) {
	return createdAt.toLocalString("en-us", {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
}

module.exports = reactionSchema;