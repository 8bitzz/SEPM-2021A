var router = require("express").Router();
var { search, searchMock } = require("../controllers/appController");

router.get("/search-mock", searchMock); // differnt format than normal search, should return list of videos rather than a single transcript
router.get("/search", search);

module.exports = router;
