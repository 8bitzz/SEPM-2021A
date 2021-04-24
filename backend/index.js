var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var dotenv = require("dotenv");
var cors = require("cors");
var admin = require("firebase-admin");
var serviceAccount = require("./edusearch-680ef-firebase-adminsdk-qp590-0b68bc838a");

// Import routes
var userRoutes = require("./routes/userRoutes");

// Import authentication route
var { isAuthenticated } = require("./controllers/userControllers");

// App config
var app = express();
dotenv.config();
var PORT = process.env.PORT;

//MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://edusearch-680ef-default-rtdb.firebaseio.com",
});
let defaultAuth = admin.auth();

defaultAuth
    .verifyIdToken("5KCpGxHVmpfSFo6k9mdsrEVKlg42")
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
    })
    .catch((error) => {
        console.log("error");
    });

//Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/media", express.static(__dirname + "/public/media")); // serving static resources in Node.JS

//Authentication Middleware
app.use(isAuthenticated);

// Routes
app.use("/users", userRoutes);

// Default routes
app.get("/", function (req, res) {
    res.send(`Restful API is running on port ${PORT}`);
});

// Express App initialize
app.listen(PORT, function () {
    console.log(`Your server is running on port ${PORT}`);
});
