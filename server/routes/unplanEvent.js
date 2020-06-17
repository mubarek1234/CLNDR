const Accounts = require('../model/accountsModel');
const {removeFromInterest} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/unplanEvent', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                Accounts.unplanEvent(req.body.eventId, user.id).then(result => {
                    removeFromInterest(req.body.eventId, user.id).then(result2 => {
                        res.send({success: true, message: "Successfully unplanned event."});
                    });
                });
            }
        })(req, res, next);
    });
}