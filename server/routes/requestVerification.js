const VerificationRequests = require('../model/verificationRequestsModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/requestVerification', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                if (req.body.contact_email == undefined ||
                    req.body.org_name == undefined ||
                    req.body.profile_pic_url == undefined ||
                    !(req.body.contact_email.length > 0 && req.body.org_name.length > 0 && req.body.profile_pic_url.length > 0)) {
                    res.send({success: false, message: "Missing data."});
                }
                else {
                    VerificationRequests.readVerificationRequestsForUser(user.id).then(querySnapshot => {
                        if (querySnapshot.empty) {
                            VerificationRequests.createVerificationRequest(user.id, req.body.contact_email, req.body.org_name, req.body.profile_pic_url).then(docRef => {
                                res.send({success: true, message: "Verification request created."});
                            });
                        }
                        else {
                            res.send({success: false, message: "An active verification request already exists."});
                        }
                    });
                }
            }
        })(req, res, next);
    });
}