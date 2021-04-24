// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const { getURIGoogleStorage } = require("../../utils/main");

// Creates a client
const client = new speech.SpeechClient();

const processAudio = (config) => {

    // Get all data
    const fileName = config.fileName;
    const gcsUri = getURIGoogleStorage(fileName);
    const encoding = config.encoding ?? 'MP3';
    const sampleRateHertz = config.sampleRateHertz ?? 16000;
    const languageCode = config.languageCode ?? 'en-US';

    // Google Speech Request
    const request = {
        config: {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
        },
        audio: {
            uri: gcsUri,
        }
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    const [operation] = await client.longRunningRecognize(request);
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
    return transcription;
};

module.exports = {
    processAudio,
};
