const SavedVideo = require("../models/savedVideo");

const createSaveVideo = async (req, res) => {
    try {
        let { video, saved_term } = req.body;
        if ((!video)) return res.status(400).json({ error: "Video Id is missing in body!" });
        let user = req.user._id;
        let checkVideoSaved = await SavedVideo.findOne({ video, user }).exec();
        if (checkVideoSaved) {
            return res.status(400).json({ error: "User has previously saved this video!" });
        }
        let sv = new SavedVideo({ video, saved_term, user });
        await sv.save();
        res.json({ message: "Video saved for user", data: sv });
    } catch (error) {
        return res.status(400).send(error);
    }
};

const deleteSaveVideo = async (req, res) => {
    try {
        let { video } = req.params;
        if (!video) return res.status(400).json({ error: "Video Id is missing in params!" });
        let user = req.user._id;
        let deleteVideo = await SavedVideo.findOneAndDelete({ video, user }).exec();
        if (!deleteVideo) return res.status(400).json({ message: "SavedVideo is not avaialble to delete!" });
        res.json({ message: "Video has deleted successfully for user!", data: deleteVideo });
    } catch (error) {
        return res.status(400).send(error);
    }
};

const getAllSavedVideo = async (req, res) => {
    try {
        let user = req.user._id;
        let svs = await SavedVideo.find({ user }).populate("user video").exec();
        res.json(svs);
    } catch (error) {
        return res.status(400).send(error);
    }
};

const isVideoSaved = async (req, res) => {
    try {
        let { video } = req.params;
        if (!video) return res.status(400).json({ error: "Video Id is missing in params!" });
        let user = req.user._id;
        let isSaved = await SavedVideo.findOne({ video, user }).exec();
        if (!isSaved) return res.status(400).json({ code: false, message: "Video is not saved for user!" });
        res.json({ code: true, message: "Video has been saved for user!", data: isSaved });
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports = {
    createSaveVideo,
    deleteSaveVideo,
    getAllSavedVideo,
    isVideoSaved,
};
