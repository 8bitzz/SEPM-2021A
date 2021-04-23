const dump_options = (url) => {
    return {
        dumpJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        referer: url,
        matchFilter: `duration < ${process.env.MAX_VIDEO_LENGTH}`,
        //Get File directly from youtube, but have timeline error in Quicktime
        format: "worstaudio[ext=m4a]",
        writeSub: true,
        subLang: "en",
        writeAutoSub: true,
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

const playlist_options = {
    dumpJson: true,
    flatPlaylist: true,
    getDuration: true,
    getDescription: true,
    // getId: true, // use this to get id only, remove others
};

const getFileOutput = (output) => {
    return `${process.cwd()}\/assets\/${output._filename}`;
};

module.exports = {
    dump_options,
    download_options,
    getFileOutput,
    playlist_options,
};
