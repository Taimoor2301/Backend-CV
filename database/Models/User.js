const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "name missing"],
		minlength: 3,
	},
	email: {
		type: String,
		required: [true, "please provide an email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true],
		minlength: 6,
	},
});

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(this.password, salt);
	this.password = hashPassword;
	next();
});

userSchema.methods.getToken = function () {
	const payload = { userId: this._id, userName: this.name, email: this.email };
	try {
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});
		return token;
	} catch (error) {
		return "token not generated";
	}
};

module.exports = mongoose.model("User", userSchema);
