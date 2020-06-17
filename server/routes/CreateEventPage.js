const {createEvent} = require('../model/CLNDRModel');
const passport = require('passport');

module.exports = function(app) {
    app.post('/CreateEventPage', (req, res, next) => {
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
                    const start = new Date(req.body.startDate + 'T' + req.body.startTime);
                    const end = new Date (req.body.endDate + 'T' + req.body.endTime);
                    if (end < start) {
                        res.send({success: false, message: "End date/time cannot be before start date/time."});
                    }
                    else {
                        createEvent(req.body.title, req.body.hostID, start, end, req.body.description, req.body.keywords, req.body.cohosts, req.body.imageUrl,req.body.interestCount).then(result => {
                            res.send({success: true, message: "Created event."});
                        });
                    }
                }
                else {
                    res.send({success: false, message: "User not verified."});
                }
            }
        })(req, res, next);
    })
};