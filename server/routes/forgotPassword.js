const Accounts = require('../model/accountsModel');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    app.post('/forgotPassword', (req, res, next) => {
        if(req.body.username === undefined || req.body.sec_answer === undefined ||
            req.body.new_password === undefined){
            res.send({success: false});
        }
        else{
            Accounts.readAccountByUsername(req.body.username).then(querySnapshot => {
                if (querySnapshot.empty) {
                    res.send({success:false, message: 'Username does not exist'});
                }
                else{
                    const userData = querySnapshot.docs[0];
                    if(!bcrypt.compareSync(req.body.sec_answer, userData.get('sec_answer'))){
                        res.send({success: false, message: 'Incorrect Security Answer'});
                    }
                    else{
                        Accounts.updateAccount(userData.ref.id, {password: req.body.new_password}).then(result =>{
                            res.send({success: true})
                        })
                    }
                }
            })
        }

    });
};
