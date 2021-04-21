const ytdownload = require("./src/youtube-dl/process");
require('dotenv').config()

let url = "https://www.youtube.com/c/mitocw/playlists?view=50&shelf_id=5";

ytdownload.getVideoList(url, process.env.TEMP_FILE_NAME);