const {updateEvent, getEvent} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/updateEvent', (req, res, next) => {
        console.log("-------------------------------------"); 
        console.log(req.body);
        console.log("-------------------------------------"); 
        console.log("updateEvent UPDATED! 1");
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
    
                console.log("updateEvent UPDATED! 2");
                console.log(err);
            }
            if (info != undefined) {
    
                console.log("updateEvent UPDATED! 3");
                console.log(info.message);
                console.log("checking 1 2 3 in updateEvent");
                res.send({success: false, message: info.message});
            }
            else {
                if (user.data.verified) {
                    console.log("updateEvent UPDATED! 4");
                    getEvent(req.body.eventId).then(documentSnapshot => {
                        console.log("updateEvent UPDATED! 4.5.5");
                        if (documentSnapshot.exists) {
                            console.log("updateEvent UPDATED! 5");
                            if (user.id === documentSnapshot.get("hostID")) {
                                console.log("updateEvent UPDATED! 6");
                                const howdy = 0;
                                const start = new Date(req.body.startDate + 'T' + req.body.startTime);
                                const end = new Date (req.body.endDate + 'T' + req.body.endTime);
                                if (end < start) {
                                    res.send({success: false, message: "End date/time cannot be before start date/time."});
                                }
                                else {
                                   updateEvent(req.body.eventId, req.body.title, start, end, req.body.description, req.body.keywords, req.body.cohosts, req.body.imageUrl, howdy).then(result => {
                                        res.send({success: true, message: "Updated event."});
                                    });                                
                                }
                            }
                            else {
                                console.log("updateEvent UPDATED! 7");
                                res.send({success: false, message: "User is not owner of event."});
                            }
                        }
                        else {
    
                            console.log("updateEvent UPDATED! 8");
                            res.send({success: false, message: "Event not found."});
                        }
                    });
                    console.log("updateEvent UPDATED! 4.5");
                }
                else {
    
                    console.log("updateEvent UPDATED! 9");
                    res.send({success: false, message: "User not verified."});
                }
            }
        })(req, res, next);
    })
};