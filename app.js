const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8080, () => {
    console.log("Server Started");
    console.log("Go to a browser and type: localhost:8080");
});