const Accounts = require('../model/accountsModel');
const {getEvent} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.get('/planned', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                const planned = user.data.planned_events;
                var result = [];
                var wantedSize = planned.length;

                const processData = new Promise((resolve, reject) => {
                    planned.forEach((element, index, array) => {
                        getEvent(element).then(documentSnapshot => {
                            if (documentSnapshot.exists) {
                                Accounts.readAccountByID(documentSnapshot.get('hostID')).then(hostSnapshot => {
                                    if (hostSnapshot.exists) {
                                       
                                        result.push({id: element, name: documentSnapshot.get('eventName'), hostName: hostSnapshot.get('org_name'), description: documentSnapshot.get('eventDescription'), start: documentSnapshot.get('start')._seconds, end: documentSnapshot.get('end')._seconds,hostID: documentSnapshot.get('hostID')});
                                    }
                                    else {
                                        wantedSize--;
                                    }

                                    if (result.length === wantedSize) {
                                        resolve();
                                    }
                                })
                            }
                            else{
                                Accounts.unplanEvent(element, req.query.userID);
                                wantedSize--;
                            }
                        });
                    });
                });
                processData.then(() => {
                    result.sort((a, b) => {
                        if (a.start < b.start) {
                            return -1;
                        }
                        else if (a.start > b.start) {
                            return 1;
                        }
                        else {
                            if (a.end < b.end) {
                                return -1;
                            }
                            else if (a.end > b.end) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                    });
                    
                    res.send({success: true, data: result});
                });           
            }
        })(req, res, next);
    });
};