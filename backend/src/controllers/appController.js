var mockData = require("../mock-data/response.json");

const search = async (req, res) => {
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
        videoURL: "https://www.youtube.com/watch?v=pfU0QORkRpY",
        numberOfMatchedVideos: 1,
        numberOfMatchedSentence: matchedTranscriptIndxes.count,
        originalTranscription: mockData.transcription,
        matchingTranscriptionIndexs: matchedTranscriptIndxes
      };

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
  
  module.exports = {
    search,
  };
  