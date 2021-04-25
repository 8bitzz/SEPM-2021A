// Imports the Google Cloud client library
const speech = require("@google-cloud/speech");
const {
  getURIGoogleStorage,
  getGoogleCredentialKeyFile,
} = require("../../utils/main");

const processAudio = async (config) => {
  // Get all data
  const uri = "audio/trimp.flac"
  const gcsUri = getURIGoogleStorage(uri);
  const encoding = config.encoding ?? process.env.GOOGLE_SPEECH_ENCODING;
  const sampleRateHertz =
    config.sampleRateHertz ?? process.env.GOOGLE_SPEECH_SAMPLE_RATE;
  const languageCode =
    config.languageCode ?? process.env.GOOGLE_SPEECH_LANGUAGE_CODE;

  // Google Speech Request
  console.log("[Google Speech]: Transcripting audio ...");
  const request = {
    config: {
      encoding: encoding,
      languageCode: languageCode,
      enableWordTimeOffsets: true,
      audioChannelCount: 2
    },
    audio: {
      uri: gcsUri,
    },
  };
  console.log(request);

  // Creates a client
  const keyFileName = getGoogleCredentialKeyFile();
  const client = new speech.SpeechClient({ keyFilename: keyFileName });

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  const [operation] = await client.longRunningRecognize(request);
  console.log("[Google Speech]: Waiting for Google Speech Operation to complete...")
  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();
  console.log("[Google Speech]: Finished! Response count = " + response.results.length);
  console.log(response.results);
  
  // Log and response data
  var data = [];
  response.results.forEach((result) => {
    var row = result.alternatives[0];
    if (row !== undefined) {
      data.push(row)
    }
    console.log(`Transcription: ${result.alternatives[0].transcript}`);
    result.alternatives[0].words.forEach((wordInfo) => {
      // NOTE: If you have a time offset exceeding 2^32 seconds, use the
      // wordInfo.{x}Time.seconds.high to calculate seconds.
      const startSecs =
        `${wordInfo.startTime.seconds}` +
        "." +
        wordInfo.startTime.nanos / 100000000;
      const endSecs =
        `${wordInfo.endTime.seconds}` +
        "." +
        wordInfo.endTime.nanos / 100000000;
      console.log(`Word: ${wordInfo.word}`);
      console.log(`\t ${startSecs} secs - ${endSecs} secs`);
    });
  });
  return data;
};

module.exports = {
  processAudio,
};
