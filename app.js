const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on("connected", () => {
    console.log("connected to database"+config.database);
});

mongoose.connection.on( "error", (err) => {
    console.log("Database Error "+ err);
})

const app = express();

const users = require("./routes/users");

const port = 3000;

//TO enable Cors , CORS middleware
app.use(cors());

//set Static Folder 
app.use(express.static(path.join(__dirname, 'public')));

//body parser MidlleWare
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routes file to be used
app.use("/users",users);

//Index route
app.get('/', (req, res) => {
    res.send("Invalid End point");
})

app.listen(port, () => {
    console.log("server started on port",3000);
});