const {deleteEvent, getEvent} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/deleteEvent', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                if (user.data.verified) {
                    getEvent(req.body.eventId).then(documentSnapshot => {
                        if (documentSnapshot.exists){
                            if (user.id === documentSnapshot.get("hostID")) {
                                deleteEvent(req.body.eventId).then(result => {
                                    res.send({success: true, message: "Deleted event."});
                                });
                            }
                            else {
                                res.send({success: false, message: "User is not owner of event."});
                            }
                        }
                        else {
                            res.send({success: false, message: "Event not found."});
                        }
                    });
                }
                else {
                    res.send({success: false, message: "User not verified."});
                }
            }
        })(req, res, next);
    })
};