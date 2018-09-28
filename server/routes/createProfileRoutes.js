module.exports = function(app) {
    var createProfile = require('../controllers/createProfileController');


    // app.post('/api/createprofile', function(request, response) {
    //     response.send("blah");
    //     createProfile.
    // });

    app.route('/api/createprofile')
        .post(createProfile.createSampleProfile);
};
    
// app.post("/api/createProfile", function(req, res) {
//     // var newContact = req.body;
//     // newContact.createDate = new Date();
  
//     // if (!req.body.name) {
//     //   handleError(res, "Invalid user input", "Must provide a name.", 400);
//     // } else {
//     //   db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
//     //     if (err) {
//     //       handleError(res, err.message, "Failed to create new contact.");
//     //     } else {
//     //       res.status(201).json(doc.ops[0]);
//     //     }
//     //   });
//     // }
//     res.send("blah");

// });