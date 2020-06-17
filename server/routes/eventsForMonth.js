const {readEventsForMonth} = require('../model/CLNDRModel');

module.exports = function(app) {
    app.post('/eventsForMonth', (req, res) => {
        if (req.body.month == undefined || req.body.year == undefined || typeof req.body.month !== "number" || typeof req.body.year !== "number") {
            res.send({success: false});
        }
        else {
            readEventsForMonth(req.body.month, req.body.year).then(querySnapshot => {
                var arrayOfArrays = [];
                for (var i = 0; i < 31; i++) {
                    arrayOfArrays.push([]);
                }

                if (querySnapshot.empty) {
                    res.send({success: true, data: arrayOfArrays})
                }
                else {
                    querySnapshot.forEach(documentSnapshot => {
                        const start = documentSnapshot.get('start');
                        const timestamp = start._seconds * 1000;
                        const date = new Date(timestamp).getDate();

                        arrayOfArrays[date - 1].push({id: documentSnapshot.ref.id, name: documentSnapshot.get('eventName'), description: documentSnapshot.get('eventDescription')});
                    })

                    res.send({success: true, data: arrayOfArrays})
                }
            })
        }
    });
};