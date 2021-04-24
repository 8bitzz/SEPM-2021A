const Video = require("../models/video");

const transcriptSingleAudio = async (req, res) => {
  try {
      // Validate URL
      const videoID = req.body.videoID;
      if (!videoID || videoID.length === 0) {
        return res.status(400).json({ error: "Missing videoID in the Body!" });
      }
      
      // Check if the video exists in the mongodb
      let videos = await Video.find({ id: videoID }).exec();
      if (videos.length === 0) {
        return res.status(400).json({ error: "Could not find Video ID in the database!" });
      }

      // Check if it is processed
      const video = videos[0];
      if (video.processed) {
        return res.status(400).json({ error: "Video is already processed!" });
      }

      return res.json({ message: "It's transcriptSingleAudio!" });
  } catch (error) {
      return res.status(400).json({ error });
  }
};

module.exports = {
  transcriptSingleAudio,
};
