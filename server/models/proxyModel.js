var mongoose = require('mongoose');

var proxySchema = new mongoose.Schema({
    userId: String,
    proxy: String,
    region: String,
    instanceId: String,
    server: String
});

module.exports = mongoose.model('linodeproxies', proxySchema);