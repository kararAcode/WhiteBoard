const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
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

router.post('/login', 
    passport.authenticate('local', {
      failureRedirect: "/login",
      successRedirect: "/secret",
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