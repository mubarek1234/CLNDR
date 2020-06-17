const {readEventsByHost} = require('../model/CLNDRModel');

module.exports = function(app) {
    app.get('/eventsForHost', (req, res) => {
        
        console.log(req.query.hostID);
        if (req.query.hostID === undefined) {
            res.send({success: false});
        }
        else {
            readEventsByHost(req.query.hostID).then(querySnapshot => {
                var arrayOfEvents = [];
                //console.log(querySnapshot);
                querySnapshot.forEach(documentSnapshot => {
                    var dataForCurrent = documentSnapshot.data();
                    delete dataForCurrent.start;
                    delete dataForCurrent.end;
                    dataForCurrent["start"] = documentSnapshot.get('start')._seconds;
                    dataForCurrent["end"] = documentSnapshot.get('end')._seconds

                    arrayOfEvents.push({id: documentSnapshot.ref.id, ...dataForCurrent});
                });

                arrayOfEvents.sort((a, b) => {
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
                res.send({success: true, data: arrayOfEvents});
            });
        }
    })
}