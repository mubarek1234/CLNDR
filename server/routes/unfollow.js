const Accounts = require('../model/accountsModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/unfollow', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
    
            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                Accounts.unfollowHost(req.body.hostId, user.id).then(result => {
                    res.send({success: true, message: "Unfollowed user."});
                });
            }
        })(req, res, next);
    });
}