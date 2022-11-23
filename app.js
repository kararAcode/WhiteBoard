const express = require("express");
const app = express();
const passport = require("passport");



const User = require("./models/user.js");


app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/calendar", (req, res) => {
    res.render("calendar");
});


app.get("/login", (req, res) => {
   res.render("login"); 
});

app.post("/login", (req, res) => {


});

app.listen(8080, () => {
    console.log("Server Started");
    console.log("Go to a browser and type: localhost:8080");
});

function isLoggedIn(req, res, next) {
    if (!req.isAuthenicated) {
        req.session.returnTo = req.originalUrl;
        return res.redirect("/login");
    }

    next();
}