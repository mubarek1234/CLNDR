const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log('Listening on port', port));

require('./auth/passport');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

// create event
require('./routes/CreateEventPage')(app);

// update event
require('./routes/updateEvent')(app);

// delete event
require('./routes/deleteEvent')(app);

// display event details
require('./routes/getEvent')(app);

// log in
require('./routes/login')(app);

// create account
require('./routes/register')(app);

// update account
require('./routes/updateAccount')(app);

// delete account
require('./routes/deleteAccount')(app);

// user info
require('./routes/userInfo')(app);

// account info
require('./routes/accountInfo')(app);

// following
require('./routes/following')(app);

// planned
require('./routes/planned')(app);

// request verification
require('./routes/requestVerification')(app);

// status check (unused)
// require('./routes/verificationApplicationStatus')(app);

// events for month
require('./routes/eventsForMonth')(app);

// plan event
require('./routes/planEvent')(app);

// unplan event
require('./routes/unplanEvent')(app);

// follow
require('./routes/follow')(app);

// unfollow
require('./routes/unfollow')(app);

// display list of events by host
require('./routes/eventsForHost')(app);

// forgot password
require('./routes/forgotPassword')(app);

module.exports = app;
