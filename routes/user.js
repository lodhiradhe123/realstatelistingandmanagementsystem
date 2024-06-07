var express = require("express");
var router = express.Router();

const UserSchema = require("../models/userSchema");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// passport.use(new LocalStrategy(UserSchema.authenticate()));

const { isLoggedIn } = require("../utility/auth");

passport.use(UserSchema.createStrategy());

router.get("/", function (req, res, next) {
    res.render("index",{user:req.user});
});

router.post("/current", isLoggedIn, function (req, res, next) {
    res.send(req.user);
});
router.get("/register",function(req,res,next){
    res.render("register",{user:req.user})
})

router.post("/register", async function (req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        const newuser = new UserSchema({ name, email, role });
        await UserSchema.register(newuser, password);
        res.redirect("/user/login")
    } catch (error) {
        res.send(error.message);
    }
});
router.get("/login", function(req,res,next){
    res.render("login",{user:req.user})
})

router.post(
    "/login",
    passport.authenticate("local",{
        successRedirect:"/user/profile",
        failureRedirect:"/login",
    }),
    function (req, res, next) {
        res.send("user logged in");
    }
);

router.get("/profile",isLoggedIn,function(req,res,next){
    res.render("profile",{user:req.user})
})

router.get("/logout", function (req, res, next) {
    req.logout(() => {
        res.send("user logged out");
    });
});

module.exports = router;
