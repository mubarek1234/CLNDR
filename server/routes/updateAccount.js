const Accounts = require('../model/accountsModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/updateAccount', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                if (req.body.username != undefined) {
                    // check for no duplication
                    Accounts.readAccountByUsername(req.body.username).then(snapshot => {
                        if (snapshot.empty || req.body.username === user.data.username) {
                            Accounts.updateAccount(user.id, req.body);
                            res.status(200).send({success: true, message: "Updated account."});
                        }
                        else {
                            res.send({success: false, message: "Username already taken. Account not updated."});
                        }
                    });
                }

            }
        })(req, res, next);
    });
};