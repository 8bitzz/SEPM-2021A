const Video = require("../models/video");
const GoogleStorageService = require("../services/google-storage-api/main");
const GoogleSpeechService = require("../services/google-speech-api/main");

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
      return res
        .status(400)
        .json({ error: "Could not find Video ID in the database!" });
    }

    // Check if it is processed
    const video = videos[0];
    if (video.processed) {
      return res.status(400).json({ error: "Video is already processed!" });
    }

    // Upload to Google Storage
    const fileName = video._filename;
    const uri = await GoogleStorageService.uploadAudio(fileName);

    // Save URI to Video in Mongodb
    video.google_storage_uri = uri
    await video.save();
    
    // Transcript
    const transcription = await GoogleSpeechService.processAudio({uri});

    // Response
    return res.json({ message: "Success! URI = " + uri, "transcription": transcription });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  transcriptSingleAudio,
};
