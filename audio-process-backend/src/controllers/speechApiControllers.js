const transcriptSingleAudio = async (req, res) => {
  try {
      return res.json({ message: "It's transcriptSingleAudio!" });
  } catch (error) {
      return res.status(400).json({ error });
  }
};


module.exports = {
  transcriptSingleAudio,
};
