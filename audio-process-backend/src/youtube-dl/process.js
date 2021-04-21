const youtubedl = require("youtube-dl-exec");
const { dump_options, download_options, getFileOutput } = require("./config");
const fs = require("fs");

const singleDownload = (url, next) => {
    console.log(`Processing link ${url}`);
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

const playlistDownload = async (url, next) => {
    // console.log(`Processing link ${url}`);
    // youtubedl(url, { flatPlaylist: true, j: true }).then((output) => {
    //     console.log(output);
    // });
};

const getPlaylists = (url, filename) => {
    const subprocess = youtubedl.raw(url, {
        dumpJson: true,
        flatPlaylist: true,
        getDuration: true,
    });
    console.log(`Running subprocess as ${subprocess.pid}`);
    subprocess.stdout.pipe(fs.createWriteStream(filename));
    subprocess.stderr.on("error", (error) => {
        console.log("Error!");
        console.log(error);
    });
    subprocess.on("exit", (code, signal) => {
        console.log(`Process completed! Code ${code}!`);
    });
};

module.exports = { singleDownload, playlistDownload, getPlaylists };
