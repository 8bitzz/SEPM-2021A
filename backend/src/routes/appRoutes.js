var router = require("express").Router();
var { search, searchmock } = require("../controllers/appController");

router.get("/search-mock", searchmock); // differnt format than normal search, should return list of videos rather than a single transcript
router.get("search", search);

module.exports = router;
