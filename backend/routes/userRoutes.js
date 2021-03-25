var express = require("express");
var router = express.Router();
var { register, login, loginRequired, changePassword, deleteUser, isAuthenticated } = require("../controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.put("/", loginRequired, changePassword);
router.delete("/:username", loginRequired, deleteUser);

// Test required authentication routess
router.get("/test", isAuthenticated, (req, res) => {
    res.json({ message: "User has been authenticated" });
});

module.exports = router;
