var express = require('express')
    , cors = require('cors')
    , get = require('./routes/participants')
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

app.get('/', get.all);
app.get('/:email', get.checkEmail)
app.get('/:id/:pwd', get.one);
app.post('/:firstname/:lastname/:email/:password', get.addUser);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});