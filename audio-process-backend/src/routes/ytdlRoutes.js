var router = require("express").Router();
var { processPlaylist, processSingle } = require("../controllers/ytdlControllers");

router.post("/single", processSingle);

router.post("/playlist", processPlaylist);

module.exports = router;
