var proxyStatus = require('../models/proxyStatusModel');

exports.setStatusMessage = function(userId, provider, statusMessage) {
  console.log("setStatusMessage...");
  proxyStatus.findOneAndUpdate({ userId: userId, proxyProvider: provider },
    { statusMessage: statusMessage },
    { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, suc) {
      if (err) {
        console.log(`Failed updating user:${userId}. Error: ${err}`);
      }
      if(suc) {
        console.log(`Successfully set the StatusMessage for User: ${userId}`);
      } else {
        console.log('not found');
      }
    });
};
