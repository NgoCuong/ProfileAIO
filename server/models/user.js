var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});

module.export = mongoose.model("User", userSchema);