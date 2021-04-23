const ytdownload = require("./src/youtube-dl/main");
require("dotenv").config();


// let a = async () => {
//     let b = await ytdownload.singleDownload(url);
//     console.log(b);
// };
// a();

// ytdownload.getVideosFromPlayList(url, (data) => {
//     if (data.code === 1) {
//         return console.log(data.error);
//     }
//     ytdownload.downloadVideoFromList(data.output, (output) => {
//         console.log(output);
//     });
// });

