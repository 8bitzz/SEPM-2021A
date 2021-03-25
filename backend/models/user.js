var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.plugin(uniqueValidator);
UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = mongoose.model("User", UserSchema);
