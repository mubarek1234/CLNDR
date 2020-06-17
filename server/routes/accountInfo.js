const passport = require('passport');

module.exports = function(app) {
    app.get('/accountInfo', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err);
            }

            if (info != undefined) {
                console.log(info.message);
                res.send({success: false, message: info.message});
            }
            else {
                var data = user.data;
                delete data.password;
                delete data.sec_answer;
                res.send({success: true, id: user.id, data: data});
            }
        })(req, res, next);
    });
};