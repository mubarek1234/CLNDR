const {getEvent} = require('../model/CLNDRModel');

module.exports = function(app) {
    app.get('/getEvent', (req, res) => {
        if (req.query.eventId != undefined) {
            getEvent(req.query.eventId).then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    var workingData = documentSnapshot.data();
                    
                    if (documentSnapshot.get('interest') !== undefined) {
                        delete workingData.interest;
                        delete workingData.interestCount;
                        workingData["interestCount"] = documentSnapshot.get('interest').length;
                    }

                    res.send({success: true, id: documentSnapshot.ref.id, data: workingData});
                }
                else {
                    res.setDefaultEncoding({success: false, message: "Event not found."});
                }
            });
        }
        else {
            res.send({success: false, message: "Field eventId is undefined"});
        }
    })
}