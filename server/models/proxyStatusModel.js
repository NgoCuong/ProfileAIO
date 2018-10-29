var mongoose = require('mongoose');

var proxyStatusSchema = new mongoose.Schema({
    userId: String,
    proxyProvider: String,
    statusMessage: String
});

module.exports = mongoose.model('proxyStatus', proxyStatusSchema);
