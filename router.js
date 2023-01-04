const router = require("express").Router();
const passport = require("passport");
const User = require("./models/user");
const Course = require("./models/course")
const fs = require("fs");

router.get("/", isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id)
        .populate({
            path: "courses"
        })
        

    res.render("main", {user});
});

router.get("/courses", isLoggedIn, (req, res) => {
    res.redirect("/");
})

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.get("/calendar", (req, res) => {
    res.render("calendar"); 
});

router.get("/course", (req, res) => {
    res.render("course"); 
});


router.get("/secret", isLoggedIn, (req, res) => {
    // a "secret page" is rendered and the name of the user is displayed when logged in
  	res.render("secret", {name: req.user.username});
});

router.get("/actualVideo", (req, res) => {
    res.render("video")
});

router.get("/video", (req, res) => {
    const path = 'public/assets/sample.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start) + 1;

        const file  = fs.createReadStream(path, {start, end});
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
        fs.createReadStream(path).pipe(res);
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

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
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

module.exports = router;