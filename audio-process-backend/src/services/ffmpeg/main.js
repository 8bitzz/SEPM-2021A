const { FFmpeg, ffprobe, ffprobeSync } = require("kiss-ffmpeg");

var convertToFLAC = (filename, next) => {
    let filePath = process.cwd() + "/assets/" + filename;
    let newFilePath = filePath.replace(process.env.FILE_FORMAT, "flac");
    new FFmpeg({
        inputs: filePath,
        outputs: { url: newFilePath, options: { "c:v": "libx264", "c:a": "flac" } },
    })
        .on("start", function (proc) {
            console.log("Spawned FFmpeg with command: " + proc.spawnargs.join(" "));
        })
        .on("error", (proc, err) => {
            next({ code: 1, error: "An error occurred: " + err.message });
        })
        .on("end", () => {
            next({ code: 0, message: "Processing finished !", filename });
        })
        .run();
};

module.exports = {
    convertToFLAC,
};
