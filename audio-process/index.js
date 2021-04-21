const ytdownload = require("./src/youtube-dl/process");
require('dotenv').config()

let url = "https://www.youtube.com/watch?v=7A5-eRfDQ0M";

ytdownload.singleDownload(url);