const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes Import
const ytdlRoutes = require("./src/routes/ytdlRoutes");
const speechRoutes = require("./src/routes/speechApiRoutes");

// App config
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/assets", express.static(__dirname + "/assets")); // serving static audio resources

// Routes
app.use("/ytdl", ytdlRoutes);
app.use("/speech-api", speechRoutes);

// Default routes
app.get("/", function (req, res) {
    res.send(`Audio Process Restful API is running!`);
});

// Express App initialize
app.listen(PORT, function () {
    console.log(`Your server is running on port ${PORT}. ENV CONFIG: ${process.env.ENV_TYPE}`);
});
