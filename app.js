const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const flash = require('connect-flash');
const router = require("./router");
const mongoose = require("mongoose");

require('dotenv').config({ path: require('find-config')('.env') })

const User = require("./models/user.js");

// mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// general app config
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/public"));

// setting up passport
app.use(session({
    secret: "something", 
    resave: false, 
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//implement all routes in router.js
app.use(router);


app.listen(8080, () => {
    console.log("Server Started");
    console.log("Go to a browser and type: localhost:8080");
});

