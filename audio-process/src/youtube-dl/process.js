const youtubedl = require("youtube-dl-exec");
const { dump_options, download_options, getFileOutput } = require("./config");
const fs = require("fs");

const singleDownload = (url, next) => {
    youtubedl(url, dump_options(url)).then((output) => {
        if (!output) {
            console.log("Can't download current video (exceding expected video length)!");
            return;
        }
        console.log(`Downloading ${output._filename}`);
        if (fs.existsSync(getFileOutput(output))) {
            console.log("File has already been processed!");
        } else {
            youtubedl(url, download_options(output))
                .then((outputDownload) => {
                    console.log(outputDownload);
                    console.log("Download Successfully!");
                    if (next) {
                        next(output);
                    }
                })
                .catch((error) => {
                    console.log("Download Failed!");
                    console.log(error);
                });
        }
    });
};

module.exports = { singleDownload };
