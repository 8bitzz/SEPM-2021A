var express = require("express");
var router = express.Router();
var { verifyToken, getToken } = require("../controllers/userControllers");

router.post("/getToken", getToken);

module.exports = router;
