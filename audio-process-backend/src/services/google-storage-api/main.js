const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;

const getFilePath = (fileName) => {
  return `${process.cwd()}\/assets\/${fileName}`;
};

const uploadAudio = async (fileName) => {
  const filePath = getFilePath(fileName);
  const destFileName = "audio/" + fileName;
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
};

module.exports = {
  uploadAudio,
};
