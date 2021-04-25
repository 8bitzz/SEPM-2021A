var mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema({
    id: String,
    duration: Number,
    fulltitle: String,
    title: String,
    _filename: String,
    categories: Object,
    thumbnail: String,
    description: String,
    tags: Object,
    uploader: String,
    uploader_id: String,
    channel_id: String,
    automatic_captions: Object,
    subtitles: Object,
    requested_subtitles: Object,
    upload_date: String,
    categories: Object,
    google_storage_uri: String,
    processed: {
        type: Boolean,
        default: false,
    },
    downloaded: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Video", VideoSchema);
