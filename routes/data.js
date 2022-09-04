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
router.get("/getalldata", async (req, res) => {
  let users = await User.find();
  let data = [];
  for (let i = 0; i < users.length; i++) {
    data.push({
      name: users[i].name,
      dsa: users[i].dsa,
    });
  }
  return res.status(200).send(data);
});

router.delete("/delete/:id", async (req, res) => {
  let delItem = await ToDo.findByIdAndDelete(req.params["id"]);
  res.send(delItem);
});

module.exports = router;
