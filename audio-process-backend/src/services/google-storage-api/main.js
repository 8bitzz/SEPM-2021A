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
    throw `File ${filePath} does not exist. Please download it firstly!`;
  }

  const destFileName = "audio/" + fileName;

  // Upload to Storage
  console.log(`Uploading ${filePath} to Google Storage...`)
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  // Return the Storage path
  return destFileName;
};

module.exports = {
  uploadAudio,
};
