var mongoose = require("mongoose");

var SearchHistorySchema = new mongoose.Schema({
    term: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    searchResult: Object,
});

module.exports = mongoose.model("SearchHistory", SearchHistorySchema);
