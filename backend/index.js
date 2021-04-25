var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var cors = require("cors");
var admin = require("firebase-admin");
require("dotenv").config();
var serviceAccount = require(process.cwd() + "/" + process.env.FIREBASE_FILE);

// Import routes

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

// Test Authentication
app.get("/authtest", (req, res) => {
    res.json(req.user ? req.user : { message: "No User Found" });
});

//
app.get("/", function (req, res) {
    res.send(`Restful API is running on port ${PORT}!`);
});

// Default routes
app.get("/env-config", function (req, res) {
    res.send(`${JSON.stringify(process.env)}`);
});

// Express App initialize
app.listen(PORT, function () {
    console.log(`Your server is running on port ${PORT}`);
});
