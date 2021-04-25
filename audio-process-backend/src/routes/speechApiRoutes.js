var router = require("express").Router();
var { transcriptSingleAudio } = require("../controllers/speechApiControllers");

router.post("/transcript", transcriptSingleAudio);

module.exports = router;
