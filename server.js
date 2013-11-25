var express = require('express')
    , cors = require('cors')
    , get = require('./routes/participants')
    , getdata = require('./routes/getdata')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(cors());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
    app.use(express.errorHandler());
});

//app.get('/', get.all);
//app.get('/loginSignup/:id', get.oneEmail)
app.get('/loginSignup/:id/:pwd', get.one);
app.get('/messages/:id', getdata.onemessage);
app.get('/messages/spanish/:id', getdata.spanishone);
app.post('/messages/:id/:messageID', getdata.setMessageAsRead);
app.post('/messages/:message/:email/:messageID', getdata.addMessage);
app.post('/loginSignup/:firstname/:lastname/:email/:password/:phoneNumber', get.addUser);
app.post('/feedback/:feedback', getdata.addFeedback);

http.createServer(app).listen(app.get('port'), "0.0.0.0", function(){
    console.log("Express server listening on port " + app.get('port'));
});
