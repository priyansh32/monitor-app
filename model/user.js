const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    maxlength: 64,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "https://avatars0.githubusercontent.com/u/291828?s=460&v=4",
  },
  dsa: [
    {
      platform: String,
      difficulty: String,
      link: String,
      date: Date,
      topics: [String],
      _id: false,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
