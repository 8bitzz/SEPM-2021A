// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const { getURIGoogleStorage, getGoogleCredentialKeyFile } = require("../../utils/main");

const processAudio = async (config) => {

    // Get all data
    const uri = config.uri;
    const gcsUri = getURIGoogleStorage(uri);
    const encoding = config.encoding ?? process.env.GOOGLE_SPEECH_ENCODING;
    const sampleRateHertz = config.sampleRateHertz ?? process.env.GOOGLE_SPEECH_SAMPLE_RATE;
    const languageCode = config.languageCode ?? process.env.GOOGLE_SPEECH_LANGUAGE_CODE;

    // Google Speech Request
    console.log("Transcripting audio ...")
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
    console.log(request);

    // Creates a client
    const keyFileName = getGoogleCredentialKeyFile();
    console.log(keyFileName);
    const client = new speech.SpeechClient({ keyFilename: keyFileName });

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    console.log(client);
    const [operation] = await client.longRunningRecognize(request);
    console.log("11111111")
    // Get a Promise representation of the final result of the job
    const [response] = await operation.promise();
    console.log("222222")
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
    return transcription;
};

module.exports = {
    processAudio,
};
