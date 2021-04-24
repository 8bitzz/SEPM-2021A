const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;

const uploadAudio = async (fileName) => {
  const filePath = "../../../assets/" + fileName;
  const destFileName = "audio/" + fileName;
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
};

module.exports = {
  uploadAudio,
};
