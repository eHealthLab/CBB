/*
*
 */


var express = require('express'),
    participants = require('./routes/participants');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

/*
* CRUD routines for participants
 */
app.get('/participants', participants.getParticipant);
app.get('/participants/:id', participants.getParticipantById);
app.post('/participants/', participants.addParticipant);
app.put('/participants/:id', participants.updateParticipant);
app.delete('/participants/:id', participants.deleteParticipant);

/*
* Start the server
 */
app.listen(3000);
console.log('Listening on port 3000...');