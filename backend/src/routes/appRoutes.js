var router = require("express").Router();
var { search, searchMock } = require("../controllers/appController");

router.get("/search-mock", searchMock); // differnt format than normal search, should return list of videos rather than a single transcript
router.get("/search", search);

// Test Authentication
router.get("/authtest", (req, res) => {
    res.json(req.user ? req.user : { message: "No User Found" });
});

// View Config
router.get("/env-config", function (req, res) {
    res.send(`${JSON.stringify(process.env)}`);
});

module.exports = router;
