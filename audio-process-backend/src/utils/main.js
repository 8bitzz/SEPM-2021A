const getGoogleCredentialKeyFile = () => {
  return `${process.cwd()}\/${process.env.EDU_SEARCH_CREDENTIAL_KEY}`;
};

module.exports = {
  getGoogleCredentialKeyFile,
};
