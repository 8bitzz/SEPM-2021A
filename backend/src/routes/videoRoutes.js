const router = require("express").Router();
const { getVideoById, getRandomVideo } = require("../controllers/videoControllers");
const { loginRequired } = require("../controllers/userControllers");

router.get("/getRandomVideo", loginRequired, getRandomVideo);
router.get("/:video", loginRequired, getVideoById);

module.exports = router;
