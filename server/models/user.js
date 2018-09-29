var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.export = mongoose.model("User", userSchema);