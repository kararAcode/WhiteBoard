const router = require("express").Router();
const passport = require("passport");
const User = require("./models/user");
const Course = require("./models/course");
const AWS = require("aws-sdk");
const fs = require("fs");
const {Readable, ReadableOptions} = require("stream");
const { S3 } = require("aws-sdk");

require('dotenv').config({ path: require('find-config')('.env') })


AWS.config.update({
    accessKeyId: process.env.accesskey,
    secretAccessKey: process.env.secretAccessKey,
});

const s3 = new AWS.S3({
    region: "us-west-2"
});

router.get("/", isLoggedIn, async (req, res) => {
    res.redirect("/courses");
});

router.get("/courses", isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id)
        .populate({
            path: "courses"
        });
        

    res.render("main", {user});

});

router.get("/courses/:id", isLoggedIn, async (req, res) => {

    try {
        let course = await Course.findById(req.params.id);
        res.render("course", {course});
        
    }

    catch (err) {
        if (err.name === "CastError") {
            res.render("pageNotFound");

        }
    }



});

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.get("/calendar", (req, res) => {
    res.render("calendar"); 
});

router.get("/course", (req, res) => {
    res.render("course"); 
});

router.get("/actualVideo", (req, res) => {
    res.render("video")
});

router.get("/video", async (req, res) => {
    const path = 'public/assets/sample.mp4';
    const stat = fs.statSync(path);
    let fileSize = await sizeOf('sample.mp4', 'thewhiteboardbucket');
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start) + 1;


        // const file  = fs.createReadStream(path, {start, end});

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

        res.writeHead(200, head);
        s3.getObject({
            Bucket: "thewhiteboardbucket",
            Key: "sample.mp4"
        }).createReadStream().pipe(res);
    }


});




router.post('/login', 
    passport.authenticate('local', {
      failureRedirect: "/login",
      successRedirect: "/",
      failureFlash: true
    }),
    (req, res) => {
      console.log(req.user);
    }  
);


router.post('/logout',  (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
        }
    })
    res.redirect("/");
});

router.all("*", (req, res) => {
    res.render("pageNotFound");
});

const noLogIn = true;

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated() && !noLogIn) {
        req.session.returnTo = req.originalUrl;
        return res.redirect("/login");
    }

    next();
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
}
function sizeOf(key, bucket) {
    return s3.headObject({ Key: key, Bucket: bucket })
        .promise()
        .then(res => res.ContentLength);
}


// A test




module.exports = router;