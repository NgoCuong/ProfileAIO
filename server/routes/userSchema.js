var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    'userId': String,
    'userName': String,
    'linodeKey': String,
    'proxyUsername': String,
    'proxyPassword': String,
    'googleUri': String
});
module.exports = mongoose.model('user', userSchema);