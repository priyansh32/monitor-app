const express = require("express");
const User = require("../model/user");
const router = express.Router();

router.post("/create", async (req, res) => {
  //   topics uppercase
  topics = req.body.topics;
  topics = topics.toUpperCase();
  topics = topics.split(/[ ]*,+[ ]*/);
  let dsaq = {
    link: req.body.link,
    difficulty: req.body.difficulty,
    date: req.body.date,
    topics: topics,
  };
  await User.findOneAndUpdate({ _id: req.user._id }, { $push: { dsa: dsaq } });
  return res.status(200).send(dsaq);
});

// we have only four users in our database, so this is not a problem
router.get("/all", async (req, res) => {
  let users = await User.find({}, { _id: 0, email: 0 });
  let data = [];
  for (let i = 0; i < users.length; i++) {
    data.push({
      name: users[i].name,
      email: users[i].email,
      dsa: users[i].dsa,
    });
  }
  return res.status(200).send(data);
});

module.exports = router;
