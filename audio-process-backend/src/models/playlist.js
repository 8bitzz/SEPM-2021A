var mongoose = require("mongoose");

var PlaylistSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    playlistName: {
        type: String,
        required: true,
    },
    videoList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
