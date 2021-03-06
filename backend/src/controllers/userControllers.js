const User = require("../models/user");

const isAuthenticated = function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
        req.auth
            .verifyIdToken(req.headers.authorization.split(" ")[1])
            .then(async (decodedToken) => {
                req.user = decodedToken;
                let checkUserExisted = await User.findOne({ uid: decodedToken.uid }).exec();
                if (!checkUserExisted) {
                    let newUser = new User(decodedToken);
                    await newUser.save();
                }
                next();
            })
            .catch((error) => {
                return res.status(400).json(error);
            });
    } else {
        req.user = undefined;
        next();
    }
};

const loginRequired = async (req, res, next) => {
    try {
        if (req.user) {
            let foundUser = await User.findOne({ email: req.user.email }).exec();
            req.user._id = foundUser._id;
            next();
        } else {
            return res.status(401).json({ message: "Unauthorized user!" });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    isAuthenticated,
    loginRequired,
};
