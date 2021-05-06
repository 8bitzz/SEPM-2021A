var mongoose = require("mongoose");

var TranscriptSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    order: Number,
});
TranscriptSchema.index({text: "text"});

module.exports = mongoose.model("Transcript", TranscriptSchema);
