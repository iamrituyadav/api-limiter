const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("users", userSchema);
