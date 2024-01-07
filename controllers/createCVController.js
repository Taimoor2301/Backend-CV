const User = require("../database/Models/User");
const CVModal = require("../database/Models/cvModal");
const codes = require("http-status-codes");
const customError = require("../errors/customError");

const createCV = async (req, res) => {
	const user = req.user;

	try {
		const CVData = await CVModal.create({ ...req.body, user: user._id });
		return res.status(codes.CREATED).json(CVData);
	} catch (error) {
		return res.status(codes.INTERNAL_SERVER_ERROR).send(error);
	}
};

const getCV = async (req, res) => {
	const userId = req.user._id;
	const { id } = req.params;

	if (!userId || !id) throw new customError("IDs missing", codes.UNAUTHORIZED);

	const cv = await CVModal.findOne({ _id: id, user: userId });

	if (!cv._id) throw new customError("cv not found", codes.NOT_FOUND);

	return res.status(codes.OK).json(cv);
};

const getRecentCV = async (req, res) => {
	const userId = req.user._id;
	if (!userId) throw new customError("IDs missing", codes.UNAUTHORIZED);
	const cv = await CVModal.find({ user: userId });
	return res.status(codes.OK).json(cv);
};

const editCV = async (req, res) => {
	const { id } = req.params;

	try {
		const cv = await CVModal.findOneAndUpdate({ _id: id }, req.body);
		return res.status(codes.OK).json(cv);
	} catch (error) {
		return res.status(codes.INTERNAL_SERVER_ERROR).json(error);
	}
};

module.exports = { createCV, getCV, getRecentCV, editCV };
