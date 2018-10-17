var mongoose = require('mongoose');

var proxySchema = mongoose.Schema({

    userId: String,
    proxy: String,
    region: String,
    instanceId: String
});
module.exports = mongoose.model('linodeproxies', proxySchema);