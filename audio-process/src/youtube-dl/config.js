const dump_options = (url) => {
    return {
        dumpJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        referer: url,
        //Get File directly from youtube, but have timeline error in Quicktime
        format: "worstaudio[ext=m4a]", 

        // Get file and convert using ffmpeg
        // extractAudio: true,
        // audioFormat: "m4a",
        // audioQuality: 5 // 0 - 9 (smaller = better)
    };
};

const download_options = (output) => {
    return {
        output: getFileOutput(output),
        //Get File directly from youtube, but have timeline error in Quicktime
        format: "worstaudio[ext=m4a]", 

        // Get file and convert using ffmpeg
        // extractAudio: true,
        // audioFormat: "m4a",
        // audioQuality: 5 // 0 - 9 (smaller = better)
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
