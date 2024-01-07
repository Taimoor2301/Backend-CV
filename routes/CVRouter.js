const router = require("express").Router();
const { createCV, getCV, getRecentCV, editCV } = require("../controllers/createCVController");
// const authMiddleware = require("../middleware/authMiddleware");

router.route("/create").post(createCV);
router.route("/recent").get(getRecentCV);
router.route("/:id").get(getCV).patch(editCV);

module.exports = router;
