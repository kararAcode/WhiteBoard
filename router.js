const router = require("express").Router();
const passport = require("passport");

router.get("/", isLoggedIn, (req, res) => {
    res.render("main");
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


router.get("/secret", isLoggedIn, (req, res) => {
    // a "secret page" is rendered and the name of the user is displayed when logged in
  	res.render("secret", {name: req.user.username});
});

router.get("/video", (req, res) => {
    const path = '/assets/sample.mp4';
    const stat = fs.startFileSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        
        
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

module.exports = router;