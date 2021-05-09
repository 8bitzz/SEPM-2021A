const Video = require("../models/video");
const Transcript = require("../models/transcript");
const GoogleStorageService = require("../services/google-storage-api/main");
const GoogleSpeechService = require("../services/google-speech-api/main");
const { convertToFLAC } = require("../services/ffmpeg/main");

const transcriptSingleAudio = async (req, res) => {
    try {
        // Validate URL
        const videoID = req.body.videoID;
        if (!videoID || videoID.length === 0) {
            return res.status(400).json({ error: "Missing videoID in the Body!" });
        }

        // Check if the video exists in the mongodb
        let videos = await Video.find({ _id: videoID }).exec();
        if (videos.length === 0) {
            return res.status(400).json({ error: "Could not find Video ID in the database!" });
        }

        // Check if it is processed
        const video = videos[0];
        if (video.processed) {
            return res.status(400).json({ error: "Video is already processed!" });
        }

        // Convert to flac if need
        if (video.flacConvert) {
            await uploadAndTranscript(req, res, video, video._filename);
        } else {
            convertToFLAC(video._filename, async (data) => {
                if (data.code === 1) {
                    return res.status(400).send(data);
                }
                let { filename } = data;
                video.flacConvert = true;
                await video.save();
                await uploadAndTranscript(req, res, video, filename);
            });
        }
        //
    } catch (error) {
        return res.status(400).json({ error });
    }
};

const uploadAndTranscript = async (req, res, video, _filename) => {
    try {
        let fileName = _filename.replace(process.env.FILE_FORMAT, "flac");
        console.log("----------" + fileName);

        // Upload to Google Storage
        const uri = await GoogleStorageService.uploadAudio(fileName);

        // Save URI to Video in Mongodb
        video.google_storage_uri = uri;
        await video.save();

        // Transcript
        const transcription = await GoogleSpeechService.processAudio({ uri });

        // save
        let transcriptList = [];
        let order = 0;
        let trans = transcriptDataParse(transcription);
        for (const data of trans) {
            let newTranscript = new Transcript({ ...data, video: video._id, order });
            transcriptList.push(newTranscript._id);
            await newTranscript.save();
        }
        video.processed = true;
        video.transcriptList = transcriptList;
        await video.save();

        // Response
        return res.json({
            message: "Success! URI = " + uri,
            transcription: trans,
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

const transcriptDataParse = (transcription) => {
    let words = [];
    let bag = [];
    let result = [];
    for (const a of transcription) {
        words = words.concat(a.words);
    }
    for (let i = 0; i < words.length; i++) {
        bag.push(words[i]);
        if ((i + 1) % process.env.TRANSCRIPT_WORD_LIMIT == 0) {
            let startTime = `${checkNull(bag[0].startTime.seconds)}` + "." + checkNull(bag[0].startTime.nanos) / 100000000;
            let endTime =
                `${checkNull(bag[bag.length - 1].endTime.seconds)}` +
                "." +
                checkNull(bag[bag.length - 1].endTime.nanos) / 100000000;
            let text = "";
            bag.forEach((v) => {
                text += v.word + " ";
            });
            text = text.trim();
            result.push({ startTime, endTime, text });
            bag = [];
        }
    }
    return result;
};

const checkNull = (text) => {
    return text ? text : 0;
};

module.exports = {
    transcriptSingleAudio,
};
