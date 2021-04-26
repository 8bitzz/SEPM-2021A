const { Storage } = require("@google-cloud/storage");
const { getGoogleCredentialKeyFile } = require("../../utils/main");
const fs = require("fs");

const getFilePath = (fileName) => {
  return `${process.cwd()}\/assets\/${fileName}`;
};

const uploadAudio = async (fileName) => {
  const filePath = getFilePath(fileName);
  const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;
  const keyFileName = getGoogleCredentialKeyFile();
  const storage = new Storage({ keyFilename: keyFileName });

  // Check if the file exist before uploading
  if (!fs.existsSync(filePath)) {
    throw `[Google Storage]: File ${filePath} does not exist. Please download it firstly!`;
  }

  const destFileName = "audio/" + fileName;

  // Check if the file is already exsited on the Google Storage
  // Then skip to save bandwidth
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(destFileName);
  const results = await file.exists();
  if (results[0]) {
    console.log("[Google Storage]: File is existed. Skip uploading...");
    return destFileName;
  }

  // Upload
  console.log(`[Google Storage]: Uploading ${filePath} to Google Storage...`)
  await bucket.upload(filePath, {
    destination: destFileName,
  });

  // Return the Storage path
  console.log("[Google Storage]: Upload Done!!!");
  return destFileName;
};

module.exports = {
  uploadAudio,
};
