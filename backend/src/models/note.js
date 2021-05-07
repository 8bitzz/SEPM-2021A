var mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    note: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
    video_timeline: String,
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Note", NoteSchema);
