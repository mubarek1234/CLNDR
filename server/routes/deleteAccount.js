const Accounts = require('../model/accountsModel');
const passport = require('passport');

module.exports = function(app) {
    app.get('/deleteAccount', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            try {
                Accounts.deleteAccount(user.id).then(result => {
                    res.status(200).send({success: true, message: "Account deletion processed."});
                });
            }
            catch (err) {
                res.status(200).send({success: false, message: "Account deletion error."});
            }
        })(req, res, next);
    });
};