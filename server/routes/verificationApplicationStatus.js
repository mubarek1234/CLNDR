const VerificationRequests = require('../model/verificationRequestsModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/verificationApplicationStatus', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                VerificationRequests.readVerificationRequestsForUser(user.id).then(querySnapshot => {
                    if (querySnapshot.empty) {
                        res.send({success: true, applicationExists: false, userVerified: user.data.verified})
                    }
                    else {
                        res.send({success: true, applicationExists: true, userVerified: user.data.verified});
                    }
                });
            }
        })(req, res, next);
    });
}