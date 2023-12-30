const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is missing"],
	},
	jobTitle: {
		type: String,
		required: [true, "job title is missing"],
	},
	phoneNumber: {
		type: String,
		required: [true, "phone is missing"],
	},
	email: {
		type: String,
		required: [true, "email is missing"],
	},
	address: {
		type: String,
		required: [true, "address is missing"],
	},
	about: {
		type: String,
		required: [true, "about is missing"],
	},
	workExperience: [
		{
			role: {
				type: String,
				required: [true, "role is missing in one of the work experiences"],
			},
			company: {
				type: String,
				required: [true, "company is missing in one of the work experiences"],
			},
			startDate: {
				type: String,
				required: [true, "start date is missing in one of the work experiences"],
			},
			endDate: {
				type: String,
				required: [true, "end date is missing in one of the work experiences"],
			},
			jobDescription: String,
		},
	],

	education: [
		{
			course: {
				type: String,
				required: [true, "course name is missing in one of the educations"],
			},
			institute: {
				type: String,
				required: [true, "istitute name is missing in one of the educations"],
			},
			startDate: {
				type: String,
				required: [true, "start date is missing in one of the educations"],
			},
			endDate: {
				type: String,
			},
			detail: String,
		},
	],

	skills: [
		{
			name: {
				type: String,
				required: [true, "skill name is missing"],
			},
			efficiency: {
				type: String,
				required: [true, "skill efficiency is missing"],
			},
		},
	],

	hobbies: [{ name: String }],
	socialLinks: [
		{
			name: {
				type: String,
				required: [true, "social link name is missing"],
			},
			link: {
				type: String,
				required: [true, "link is missing in social"],
			},
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "user is missing"],
	},
});

module.exports = mongoose.model("CVData", cvSchema);
