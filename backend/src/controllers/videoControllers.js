const Video = require("../models/video");

const getVideoById = async (req, res) => {
    try {
        let { video } = req.params;
        if (!video) return res.status(400).json({ error: "Video Id is missing in params!" });
        let findVideo = await Video.findOne({ _id: video }).populate("transcriptList").exec();
        if (!findVideo) return res.status(400).json({ error: "Can't find video with videoId" });
        res.json({ message: "Video found!", video: findVideo });
    } catch (error) {
        return res.status(400).json(error);
    }
};

const getRandomVideo = async (req, res) => {
    try {
        let findVideo = await Video.find({ processed: true, transcriptList: { $exists: true } })
            .populate("transcriptList")
            .exec();
        let random = Math.floor(Math.random() * findVideo.length);
        res.json({ video: findVideo[random] });
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    getRandomVideo,
    getVideoById,
};
