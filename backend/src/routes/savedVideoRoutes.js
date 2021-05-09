const router = require("express").Router();
const { createSaveVideo, deleteSaveVideo, getAllSavedVideo, isVideoSaved } = require("../controllers/savedVideoControllers");
const { loginRequired } = require("../controllers/userControllers");

router.get("/", loginRequired, getAllSavedVideo);
router.post("/", loginRequired, createSaveVideo);
router.delete("/:video", loginRequired, deleteSaveVideo);
router.get("/is-saved/:video", loginRequired, isVideoSaved);

module.exports = router;
