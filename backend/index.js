var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var cors = require("cors");
var admin = require("firebase-admin");
require("dotenv").config();
var serviceAccount = require(process.cwd() + "/" + process.env.FIREBASE_FILE);

// Import routes
const appRoutes = require("./src/routes/appRoutes");
const searchHistoryRoutes = require("./src/routes/searchHistoryRoutes");
const savedVideoRoutes = require("./src/routes/savedVideoRoutes");
const videoRoutes = require("./src/routes/videoRoutes");
const noteRoutes = require("./src/routes/noteRoutes");

// Import authentication route
var { isAuthenticated } = require("./src/controllers/userControllers");

// App config
var app = express();
var PORT = process.env.PORT;

// firebase init
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
});

//MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

//Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Authentication Middleware
app.use((req, res, next) => {
    req.auth = admin.auth();
    next();
});
app.use(isAuthenticated);

// Routes
app.use("/app", appRoutes);
app.use("/search-history", searchHistoryRoutes);
app.use("/saved-video", savedVideoRoutes);
app.use("/video", videoRoutes);
app.use("/note", noteRoutes);

// Default route
app.get("/", function (req, res) {
    res.send(`Restful API is running on port ${PORT}!`);
});

// Express App initialize
app.listen(PORT, function () {
    console.log(`Your server is running on port ${PORT}`);
});
