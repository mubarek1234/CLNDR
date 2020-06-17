const Accounts = require('../model/accountsModel');
const {addToInterest} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/planEvent', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                Accounts.planEvent(req.body.eventId, user.id).then(result => {
                    addToInterest(req.body.eventId, user.id).then(result2 => {
                        res.send({success: true, message: "Successfully planned event."});
                    });
                });
            }
        })(req, res, next);
    });
}