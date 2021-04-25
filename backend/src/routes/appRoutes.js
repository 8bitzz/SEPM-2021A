var router = require("express").Router();
var { search } = require("../controllers/appController");

router.get("/search", search);

module.exports = router;
