const router = require("express").Router();
const { getVideoById } = require("../controllers/videoControllers");
const { loginRequired } = require("../controllers/userControllers");

router.get("/:video", loginRequired, getVideoById);

module.exports = router;
