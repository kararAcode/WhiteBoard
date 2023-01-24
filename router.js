
// This file contains a bunch of get and post routes

const router = require("express").Router();
const passport = require("passport");
const User = require("./models/user");
const Course = require("./models/course");
const AWS = require("aws-sdk");
const fs = require("fs");
const {Readable, ReadableOptions} = require("stream");
const { S3 } = require("aws-sdk");


require('dotenv').config({ path: require('find-config')('.env') }); // enables the use of enviorment variable


// uses s3 credintals to setup s3 client
AWS.config.update({
    accessKeyId: process.env.accesskey,
    secretAccessKey: process.env.secretAccessKey,
});


const s3 = new AWS.S3({
    region: "us-west-2"
});


router.get("/", isLoggedIn, async (req, res) => {
    res.redirect("/courses"); //redirects to courses as it is the main page
});

router.get("/courses", isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id)
        .populate({
            path: "courses"
        });
        // the UserSchema store courses as ids
        // in order to get the data that belongs to that course 
        // we need to populate the array of ids

    res.render("main", {user}); //i pass an object like this whenever i want to use data on frontend

});

router.get("/courses/:id", isLoggedIn, async (req, res) => {

    try {
        let course = await Course.findById(req.params.id); //finds course based on the id in the url
        res.render("course", {course});
    }

    catch (err) {
        // if a user enter an unknown course id they will see the 404 page
        if (err.name === "CastError") {
            res.render("pageNotFound");

        }
    }



});

router.post("/courses", async (req, res) => { 
    let user = await User.findById(req.user._id);
    user.addCourse(req.body.code);

    res.redirect("courses");
});

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.get("/calendar", (req, res) => {
    res.render("calendar"); 
});


router.get("/actualVideo", (req, res) => {
    res.render("video")
});

router.get("/video", async (req, res) => {
    let fileSize = await sizeOf('sample.mp4', 'thewhiteboardbucket');
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start) + 1;


        const file = await s3.getObject({
            Bucket: "thewhiteboardbucket",
            Key: "sample.mp4"
        }).createReadStream({start, end});

        const head = { 
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        }
        res.writeHead(206, head);
        file.pipe(res);
        
    }

    else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(206, head);
        s3.getObject({
            Bucket: "thewhiteboardbucket",
            Key: "sample.mp4"
        }).createReadStream().pipe(res);
    }


});

router.get("/youtube", (req, res) => {
    res.render("youtube");
})



router.post('/login', 
    passport.authenticate('local', {
      failureRedirect: "/login",
      successRedirect: "/",
      failureFlash: true
    }),
    (req, res) => {
      console.log(req.user);
    }  

    //code to autheniticate user
);


router.post('/logout',  (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
        }
    })
    res.redirect("/");

    // logs user out and redirects to login page
});

router.all("*", (req, res) => {
    // pageNotFound will be rendered the route has not been defined before
    res.render("pageNotFound");
});

function isLoggedIn(req, res, next) {
    // middleware to check if you are logged in
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.redirect("/login");
    }
    
    next();
}


function sizeOf(key, bucket) {
    // returns fileSize of file stored in s3 bucket
    return s3.headObject({ Key: key, Bucket: bucket })
        .promise()
        .then(res => res.ContentLength);
}






module.exports = router;