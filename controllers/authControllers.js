const User = require("../database/Models/User");
const codes = require("http-status-codes");
const bcrypt = require("bcryptjs");
const customError = require("../errors/customError");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	const { email, password } = req.body;

	if ((!email, !password)) throw new customError("invalid email or password", codes.BAD_REQUEST);

	const user = await User.findOne({ email });
	if (!user) throw new customError("user not found", codes.NOT_FOUND);

	const isPassValid = await bcrypt.compare(password, user.password);

	if (!isPassValid) throw new customError("invalid password", codes.BAD_REQUEST);

	const token = user.getToken();

	return res.status(codes.OK).json({
		user: {
			userId: user._id,
			name: user.name,
			email: user.email,
		},
		token,
	});
};

const register = async (req, res) => {
	const existingUser = User.find({ email: req.body.email });

	if (existingUser.name) throw new customError("user already exist", codes.INTERNAL_SERVER_ERROR);
	try {
		const { email, password, name } = req.body;
		const user = await User.create({ email, password, name });
		const token = user.getToken();
		return res.status(codes.CREATED).json({
			user: {
				userId: user._id,
				name: user.name,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		return res.status(codes.INTERNAL_SERVER_ERROR).json(error);
	}
};

const fetchUser = async (req, res) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer")) throw new customError("No headers", codes.BAD_REQUEST);

	const token = authHeader.split(" ")[1];
	const payload = jwt.verify(token, process.env.JWT_SECRET);
	const { userId, userName, email } = jwt.verify(token, process.env.JWT_SECRET);

	if (!userId) throw new customError("token not valid", codes.BAD_REQUEST);

	const user = await User.findOne({ _id: userId }).select("-password");

	if (!user._id || !user.email) throw new customError("user not found", codes.NOT_FOUND);

	return res.status(codes.OK).json(user);
};

module.exports = { login, register, fetchUser };
