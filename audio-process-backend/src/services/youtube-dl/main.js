const youtubedl = require("youtube-dl-exec");
const { dump_options, download_options, getFileOutput, playlist_options } = require("./config");
const fs = require("fs");
const decoder = new TextDecoder("utf-8");

const singleDownload = async (url, next) => {
    try {
        let output = await youtubedl(url, dump_options(url));
        if (!output) {
            throw "Can't download current video (exceding expected video length)! " + url;
        }
        if (fs.existsSync(getFileOutput(output))) {
            throw `File ${output._filename} has already been downloaded!`;
        }
        if (output.automatic_captions) {
            output.automatic_captions = { en: output.automatic_captions["en"] };
        }
        let outputDownload = await youtubedl(url, download_options(output));
        return { code: 0, output };
    } catch (error) {
        return { code: 1, error };
    }
};

const getVideosFromPlayList = (url, next) => {
    // Validate URL
    if (!url.endsWith("/videos") && !url.includes("/playlist?list=")) {
        return next({ code: 1, error: "Url is not valid! " + url });
    }
    let finalData = [];
    const subprocess = youtubedl.raw(url, playlist_options);
    // process data ouput
    subprocess.stdout.on("data", (data) => {
        let decodedMessage = decoder.decode(data);
        let a = decodedMessage.split("\n");
        a.forEach((v) => v && v.startsWith("{") && v.endsWith("}") && finalData.push(JSON.parse(v)));
    });
    // throw error if any
    subprocess.stderr.on("error", (error) => {
        return next({ code: 1, error });
    });
    // return data on exit
    subprocess.on("exit", (code, signal) => {
        return next({ code, output: finalData });
    });
};

const downloadVideoFromList = async (arr, next) => {
    let output = [];
    let err = [];
    for (const data of arr) {
        let { id, url, ie_key, _type } = data;
        if (id && url && ie_key === "Youtube" && _type === "url") {
            let response = await singleDownload("https://www.youtube.com/watch?v=" + id);
            if (response.code === 1) err.push(response.error);
            else output.push(response.output);
        }
    }
    return next({ succeeded: output, failed: err, list: arr });
};

module.exports = { singleDownload, getVideosFromPlayList, downloadVideoFromList };
