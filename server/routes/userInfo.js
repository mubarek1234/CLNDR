const Accounts = require('../model/accountsModel');

module.exports = function(app) {
    app.get("/userInfo", (req, res) => {
        if (req.query.userID != undefined) {
            Accounts.readAccountByID(req.query.userID).then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var data = documentSnapshot.data()
                    delete data.password;
                    delete data.sec_answer;
                    delete data.following;
                    delete data.planned_events;
                    res.status(200).send({success: true, id: documentSnapshot.ref.id, data: data});
                }
                else {
                    res.status(200).send({success: false, message: "User not found."});
                }
            });
        }
        else if (req.query.username != undefined) {
            Accounts.readAccountByUsername(req.query.username).then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const firstUser = querySnapshot.docs[0];
                    var userData = firstUser.data();
                    delete userData.password;
                    delete userData.sec_answer;
                    delete userData.following;
                    delete userData.planned_events;
                    res.status(200).send({success: true, id: firstUser.ref.id, data: userData});
                }
                else {
                    res.status(200).send({success: false, message: "User not found."});
                }
            });
        }
        else {
            res.status(200).send({success: false, message: "Invalid request."});
        }
    });
}