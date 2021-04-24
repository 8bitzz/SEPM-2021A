const getGoogleCredentialKeyFile = () => {
  return `${process.cwd()}\/${process.env.EDU_SEARCH_CREDENTIAL_KEY}`;
};

const getURIGoogleStorage = (fileName) => {
  return `gs://${process.env.GOOGLE_STORAGE_AUDIO_FOLDER}\/${fileName}`;
};

module.exports = {
  getGoogleCredentialKeyFile,
  getURIGoogleStorage,
};
