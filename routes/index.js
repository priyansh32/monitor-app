const express = require("express");
const User = require("../model/user");
const router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/login");
  }
}

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("login");
});

router.use("/auth", require("./auth"));

router.get("/", checkAuthentication, async (req, res) => {
  return res.render("home");
});

router.get("/:username", checkAuthentication, async (req, res) => {
  username = req.params.username;
  let req_user = await User.findOne({ username }, { _id: 0, email: 0 });
  if (!req_user) return res.redirect("/");
  return res.render("user", {
    username: req_user.name,
    dsa: req_user.dsa,
  });
});

router.use("/data", checkAuthentication, require("./data"));

module.exports = router;
