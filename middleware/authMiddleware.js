const customError = require("../errors/customError");
const codes = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../database/Models/User");
const authMiddleware = async (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer")) {
		throw new customError("no headers in request", codes.BAD_REQUEST);
	}
	const token = header.split(" ")[1];
	const payload = jwt.verify(token, process.env.JWT_SECRET);
	if (!payload.userId) throw new customError("no user id in token", codes.BAD_REQUEST);

	const user = await User.findOne({ _id: payload.userId }).select("-password");

	if (!user._id) throw new customError("user not found", codes.NOT_FOUND);

	req.user = user;
	next();
};

module.exports = authMiddleware;
