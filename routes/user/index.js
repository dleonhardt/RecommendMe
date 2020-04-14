const router = require("express").Router();

router.get("/", (req, res, next) => {
    console.log(req.user)
    if(req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;