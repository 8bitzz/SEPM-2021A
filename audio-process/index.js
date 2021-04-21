const ytdownload = require("./src/youtube-dl/process");

let url = "https://www.youtube.com/watch?v=7A5-eRfDQ0M";

ytdownload.singleDownload(url);