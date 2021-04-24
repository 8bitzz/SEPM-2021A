const { Storage } = require("@google-cloud/storage");
const { getGoogleCredentialKeyFile } = require("../../utils/main");
const fs = require("fs");

// Creates a client from a Google service account key
const keyFileName = getGoogleCredentialKeyFile();
const storage = new Storage({ keyFilename: keyFileName });
const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;

const getFilePath = (fileName) => {
  return `${process.cwd()}\/assets\/${fileName}`;
};

const uploadAudio = async (fileName) => {
  const filePath = getFilePath(fileName);

  // Check if the file exist before uploading
  if (!fs.existsSync(filePath)) {
    throw `File ${filePath} does not exist. Please download it firstly!`;
  }

  const destFileName = "audio/" + fileName;
  console.log(`${filePath} uploaded to ${bucketName}`);

  // Upload to Storage
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  // Return the Storage path
  return destFileName;
};

module.exports = {
  uploadAudio,
};
