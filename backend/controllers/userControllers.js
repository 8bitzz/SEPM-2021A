var User = require("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    });
};

const login = function(req, res) {
    User.findOne(
        {
            username: req.body.username
        },
        function(err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).json({
                    message: "Authentication failed. No user found!"
                });
            } else if (user) {
                if (
                    !user.comparePassword(req.body.password, user.hashPassword)
                ) {
                    res.status(401).json({
                        message: "Authentication failed. Wrong password!"
                    });
                } else {
                    return res.json({
                        token: jwt.sign(
                            { username: user.username, _id: user.id },
                            process.env.API_KEY
                        )
                    });
                }
            }
        }
    );
};

const loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized user!" });
    }
};

const changePassword = function(req, res) {
    User.findOne({ username: req.user.username }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(400).json({
                message: "No user found!"
            });
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(400).json({
                    message: "Wrong password! Operation failed!"
                });
            } else {
                var newUser = user;
                newUser.hashPassword = bcrypt.hashSync(
                    req.body.newPassword,
                    10
                );
                User.findOneAndUpdate(
                    { username: newUser.username },
                    newUser,
                    function(err, updatedUser) {
                        if (err)
                            return res.status(400).send({
                                message: err
                            });
                        updatedUser.hashPassword = undefined;
                        return res.json({
                            message: `Successfully updated password for user ${updatedUser.username}!`
                        });
                    }
                );
            }
        }
    });
};

const isAuthenticated = function(req, res, next) {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.API_KEY,
            (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
};

const deleteUser = function(req, res) {
    User.findOneAndDelete({ username: req.params.username }, function(
        err,
        user
    ) {
        if (err)
            return res.status(400).send({
                message: err
            });
        user.hashPassword = ""
        res.json(user);
    });
};

module.exports = {
    register,
    login,
    loginRequired,
    changePassword,
    isAuthenticated,
    deleteUser
};
