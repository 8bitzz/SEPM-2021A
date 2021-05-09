const SearchHistory = require("../models/searchHistory");

const getSearchHistoryForUser = async (req, res) => {
    try {
        let sh = await SearchHistory.find({ user: req.user._id }).sort({ _id: -1 }).lean().exec();
        if (req.query.isDetailed != "true") {
            sh = sh.map((v) => {
                v.searchResult = undefined;
                return v;
            });
        }
        res.json(sh);
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports = {
    getSearchHistoryForUser,
};
