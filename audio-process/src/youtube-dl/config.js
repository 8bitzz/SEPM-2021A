const dump_options = (url) => {
    return {
        dumpJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        referer: url,
        format: "worstaudio[ext=m4a]",
    };
};

const download_options = (output) => {
    return {
        output: getFileOutput(output),
        format: "worstaudio[ext=m4a]",
    };
};

const getFileOutput = (output) => {
    return `${process.cwd()}\/assets\/${output._filename}`;
};

module.exports = {
    dump_options,
    download_options,
    getFileOutput,
};
