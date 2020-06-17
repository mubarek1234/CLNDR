const Accounts = require('../model/accountsModel');
const passport = require('passport');

module.exports = function(app) {
    app.get('/following', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                const following = user.data.following;
                var result = [];
                var wantedSize = following.length;

                const processData = new Promise((resolve, reject) => {
                    following.forEach((element, index, array) => {
                        Accounts.readAccountByID(element).then(documentSnapshot => {
                            console.log(element);
                            console.log("in here");
                            if (documentSnapshot.exists) {
                                result.push({id: element, username: documentSnapshot.get('username'), org_name: documentSnapshot.get('org_name'), contact_email: documentSnapshot.get('contact_email')});
                            }
                            else {
                                Accounts.unfollowHost(element,req.query.userID);
                                wantedSize--;
                                console.log("in here");
                            }

                            if (result.length === wantedSize) {
                                resolve();
                            }
                        });
                    });
                });
                processData.then(() => {
                    result.sort((a, b) => {
                        if (a.username < b.username) {
                            return -1;
                        }
                        else if (a.username > b.username) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    });
                    
                    res.send({success: true, data: result});
                });           
            }
        })(req, res, next);
    });
};