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
        // format: "worstaudio[ext=m4a]",
        writeSub: true,
        subLang: "en",
        writeAutoSub: true,
        // Get file and convert using ffmpeg
        extractAudio: true,
        audioFormat: "flac",
        // audioQuality: "128k", // 0 - 9 (smaller = better)
        preferFfmpeg: true,
    };
};

const download_options = (output) => {
    return {
        output: getFileOutput(output),
        //Get File directly from youtube, but have timeline error in Quicktime
        format: "worstaudio[ext=m4a]",

        // Get file and convert using ffmpeg
        extractAudio: true,
        audioFormat: "flac",
        // audioQuality: "128k", // 0 - 9 (smaller = better)
        preferFfmpeg: true,
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
    let a = output._filename.split(".");
    a[a.length - 1] = process.env.FILE_FORMAT;
    a = a.join(".");
    return `${process.cwd()}\/assets\/${a}`;
};

module.exports = {
    dump_options,
    download_options,
    getFileOutput,
    playlist_options,
};
