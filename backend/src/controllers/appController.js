const Transcript = require("../models/transcript");
var mockData = require("../mock-data/response.json");
const Video = require("../models/video");

const searchMock = async (req, res) => {
    try {
        // Validate URL
        const term = req.query.term;
        if (!term || term.length === 0) {
            return res.status(400).json({ error: "Missing term in Param Query!" });
        }
        // Response
        var matchedTranscriptIndxes = [];
        mockData.transcription.forEach((item, index) => {
            if (item.transcript.includes(term)) {
                matchedTranscriptIndxes.push(index);
            }
        });

        const response = {
            videoURL: "https://www.youtube.com/embed/Oh8aK-0N-9M",
            numberOfMatchedVideos: 1,
            numberOfMatchedSentence: matchedTranscriptIndxes.count,
            originalTranscription: mockData.transcription,
            matchingTranscriptionIndexs: matchedTranscriptIndxes,
        };

        return res.json(response);
    } catch (error) {
        return res.status(400).json({ error });
    }
};

const search = async (req, res) => {
    try {
        // Validate URL
        let { term, isExact } = req.query;
        if (!term || term.length === 0) {
            return res.status(400).json({ error: "Missing term in Param Query!" });
        }
        // Validate isExact
        if (!isExact) {
            return res.status(400).json({ error: "Missing isExact in Param Query!" });
        }
        if (isExact.toString() == "true") {
            term = '"' + term + '"';
        }
        // Perform index text search
        let search = await Transcript.find({ $text: { $search: term } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } })
            .exec();
        let videoIdSet = new Set();
        let videoList = [];
        // Get video and map search transcript to correct video
        for (const v of search) {
            let vidId = v.video.toString();
            if (!videoIdSet.has(vidId)) {
                videoIdSet.add(vidId);
                let foundVid = await Video.findById(vidId)
                    .select("id duration title transcriptList")
                    .populate("transcriptList")
                    .lean()
                    .exec();
                foundVid.searchTranscript = [v._id];
                videoList.push(foundVid);
            } else {
                let vidIndex = videoList.findIndex((e) => e._id.toString() == vidId);
                videoList[vidIndex].searchTranscript = [...videoList[vidIndex].searchTranscript, v._id];
            }
        }
        return res.json({
            term,
            video_count: videoList.length,
            search_transcript_count: search.length,
            video_list_result: videoList,
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

module.exports = {
    search,
    searchMock,
};
