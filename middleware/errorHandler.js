const customError = require("../errors/customError");
const codes = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
	if (error instanceof customError) {
		return res.status(error.statusCode).json({ error: error.message });
	}
	return res.status(codes.INTERNAL_SERVER_ERROR).json({ message: "from error handler", error });
};

module.exports = errorHandler;
