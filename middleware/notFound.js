const notFound = (req, res) => {
	return res.status(404).send("Page not found/route does not exist");
};

module.exports = notFound;
