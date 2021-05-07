var mongoose = require("mongoose");

var SavedVideoSchema = new mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now,
    },
    saved_term: String,
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("SavedVideo", SavedVideoSchema);
