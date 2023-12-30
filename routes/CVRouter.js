const router = require("express").Router();
const { createCV, getCV } = require("../controllers/createCVController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/create").post(authMiddleware, createCV);
router.route("/:id").get(authMiddleware, getCV);

module.exports = router;
