var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: String,
    linodeKey: String,
    proxyUsername: String,
    proxyPassword: String,
    googleUri: String
});

module.exports = mongoose.model('User', userSchema);