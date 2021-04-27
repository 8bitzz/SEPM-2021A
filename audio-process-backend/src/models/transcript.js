var mongoose = require("mongoose");

var TranscriptSchema = new mongoose.Schema({
    transcript: {
        type: String,
    },
    confidence: {
        type: Number,
    },
    words: [
        {
            word: String,
            startTime: String,
            endTime: String,
        },
    ],
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    order: Number,
});

module.exports = mongoose.model("Transcript", TranscriptSchema);
