const router = require("express").Router();
const { getSearchHistoryForUser } = require("../controllers/searchHistoryControllers");
const { loginRequired } = require("../controllers/userControllers");

router.get("/", loginRequired, getSearchHistoryForUser);

module.exports = router;
