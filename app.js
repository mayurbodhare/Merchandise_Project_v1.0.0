var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    //import models from mongodb
    User = require("./models/user");

// requiring routes
var indexRoutes  = require("./routes/index");

// connecting mongoose
mongoose.connect("mongodb://")

// setting up app.use
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I am the Best!!",
    resave: false;
    saveUninitialized: false
}));
// passport setting
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.console.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// adding initials to routes
app.use("/", indexRoutes);

app.listen(3000, function () {
    console.log("Merchandise website\'s server started!!!");
});