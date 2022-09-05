const express = require("express");
const User = require("../model/user");
const router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/login", (req, res) => {
  return res.render("login");
});

router.use("/auth", require("./auth"));

router.get("/", checkAuthentication, async (req, res) => {
  // fetch user data from
  let user = await User.findOne({ email: req.user.email }, { _id: 0, dsa: 1 });
  return res.render("home", {
    username: user.name,
    dsa: user.dsa,
  });
});

usernames = {
  ajit: "ajit@gmail.com",
  harsh: "sahil.gmail.com",
  priyansh: "patidarpriyansh936@gmail.com",
  jyoti: "jyotisuman@gmial.com",
};

router.get("/:user", checkAuthentication, async (req, res) => {
  let email = usernames[req.params.user];
  if (!email) {
    return res.redirect("/");
  } else {
    let user = await User.findOne({ email }, { _id: 0, email: 0 });
    if (!user) return res.redirect("/");
    return res.render("user", {
      username: user.name,
      dsa: user.dsa,
    });
  }
});

router.use("/data", checkAuthentication, require("./data"));

module.exports = router;
