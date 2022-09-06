const express = require("express");

const router = express.Router();
const passport = require("passport");

router.get("/logout", (req, res) => {
  // this error is thrown when we try to logout without, but server doesn't crash

  /*
  Error: Unable to find the session to touch
    at D:\projects\monitor-app\node_modules\connect-mongo\build\main\lib\MongoStore.js:327:37
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
  */

  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/login");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect("/");
  }
);
module.exports = router;
