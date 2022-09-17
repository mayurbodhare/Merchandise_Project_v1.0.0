

app.get("/", function (req, res, err) {
    if(err){
        res.send("error");
        console.log(err);
    }else{
        res.render("landing");
    }
});

app.get("/home", function(req, res, err){
    if (err) {
        res.send("error");
        console.log(err);
    } else {
        res.render("home");
    }
});

app.get("/login", function(req, res, err){
    if (err) {
        res.send("error");
        console.log(err);
    } else {
        res.render("login");
    }
});