const ytprocess = require("../services/youtube-dl/main");
const Playlist = require("../models/playlist");
const Video = require("../models/video");

/**
 * Process single youtube video link
 * @requires @param {string} req.body.url - youtube url
 */
const processSingle = async (req, res) => {
    try {
        // Validate URL
        if (!req.body.url || !req.body.url.includes("https://www.youtube.com/watch?"))
            return res.status(400).json({ error: "Invalid URL!" });
        // Download audio
        let response = await ytprocess.singleDownload(req.body.url);
        if (response.code == 1) {
            return res.status(400).json(response);
        }
        let data = response.output;
        // Check if video has been added to metadata previously
        let check = await Video.find({ id: data.id }).exec();
        if (check.length !== 0)
            return res.json({ message: "Audio has been downloaded successfully! Metadata has already existed, no DB update!" });
        // Create and save video metadata
        let newVideo = new Video(data);
        newVideo.downloaded = true;
        await newVideo.save();
        return res.json({ message: "Audio of this video has been added to DB and downloaded!", data: newVideo });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * Process youtube playlists
 * @requires @param {string} req.body.url - youtube playlist url
 */
const processPlaylist = (req, res) => {
    if (!req.body.url || !req.body.playlistName) {
        return res.status(400).json({ error: "Missing url or playlistName!" });
    }
    ytprocess.getVideosFromPlayList(req.body.url, (data) => {
        if (data.code === 1) {
            return res.status(400).json({ error: data.error });
        }
        ytprocess.downloadVideoFromList(data.output, async (output) => {
            let videoList = [];
            let downloadedList = [];
            for (let e of output.list) {
                // Check if video has been added to metadata previously
                let check = await Video.find({ id: e.id }).exec();
                if (check.length == 0) {
                    let newVideo = new Video(e);
                    await newVideo.save();
                    videoList.push(newVideo._id);
                } else {
                    videoList.push(check[0]._id);
                    if (check[0].downloaded) {
                        downloadedList.push({ id: check[0].id, title: check[0].title, fulltitle: check[0].fulltitle });
                    }
                }
            }
            for (let e of output.succeeded) {
                let vid = await Video.findOneAndUpdate({ id: e.id }, { ...e, downloaded: true }, { new: true }).exec();
                if (!downloadedList.some((v) => v.id === e.id))
                    downloadedList.push({ id: vid.id, title: vid.title, fulltitle: vid.fulltitle });
            }
            let playlist = await Playlist.findOne({ url: req.body.url }).exec();
            if (playlist) {
                playlist.videoList = videoList;
            } else {
                playlist = new Playlist({ url: req.body.url, playlistName: req.body.playlistName, videoList });
            }
            await playlist.save();
            res.json({
                message: "Playlist Saved & Downloaded!",
                totalVideoCount: videoList.length,
                downloadedVideoCount: downloadedList.length,
                downloadedList,
                playlist,
                errorList: output.failed,
            });
        });
    });
};

module.exports = {
    processPlaylist,
    processSingle,
};
