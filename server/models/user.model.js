var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    '_id': String,
    'userId': String,
    'linodeKey': String,
    'proxyUsername': String,
    'proxyPassword': String,
    'googleUri': String
});

module.exports = mongoose.model('user', userSchema);