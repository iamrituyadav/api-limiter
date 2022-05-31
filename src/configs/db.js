const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb://localhost:27017/userDb");
};

module.exports = connect;
