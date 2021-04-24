const getGoogleCredentialKeyFile = () => {
  return `${process.cwd()}\/${process.env.EDU_SEARCH_CREDENTIAL_KEY}`;
};

const getURIGoogleStorage = (uri) => {
  return `gs:\/\/${process.env.GOOGLE_STORAGE_BUCKET_NAME}\/${uri}`;
};

module.exports = {
  getGoogleCredentialKeyFile,
  getURIGoogleStorage,
};
