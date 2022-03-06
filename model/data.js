const mongoose = require("mongoose");

const Data = mongoose.Schema({
  name: {
    type: String,
    require: [true, "user should have a username"],
  },
  age: {
    type: Number,
    require: [true, "user should have an age"],
  },
  phone: {
    type: Number,
    require: [true, "user should have a phonenumber"],
  },
  blood: {
    type: String,
    require: [true, "user should have a bloodgroup"],
  },
  sex: {
    type: String,
    require: [true, "user should have a gender"],
  },
});

const user = mongoose.model("user", Data);

module.exports = user;
