var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'munjala',
    password: 'artika12', database: 'cbbdb'});


exports.one = function(req, res){
    var Id = req.params.id;
    if (connection) {
        var queryString = "select * from outbound a, user" + Id + " b where a.ID = b.ID AND releasedate < now() ";
        console.log(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows[0].message);
            res.send(rows);
        });
    }
};

exports.spanishone = function(req, res){
    var Id = req.params.id;
    if (connection) {
        var queryString = "select * from outboundspanish a, user" + Id + " b where a.ID = b.ID AND releasedate < now() ";
        console.log(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows[0].message);
            res.send(rows);
        });
    }
};

exports.addMessage = function(req, res) {
    var message = req.params.message;
    var id = req.params.email;
    var messageID = req.params.messageID;
    if(connection) {
        var queryString = "update user" + id + " set inb = '" + message + "'  where ID = '" + messageID + "'";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            queryString = "select * from outbound a, user" + id + " b where a.ID = b.ID";
            connection.query(queryString, function(err, rows, fields) {
                if (err) throw err;
                console.log(rows[0].message);
                res.send(rows);
            });
        });
    }
};

exports.addFeedback = function(req, res) {
    var feedback = req.params.feedback;
    if(connection) {
        var queryString = "insert into feedback (feedback) values('" + feedback + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("Success");
        });
    }
};

exports.setMessageAsRead = function (req, res) {
    var id = req.params.id;
    var messageID = req.params.messageID;
    if(connection) {
        var queryString = "update user" + id + " set outb = true where ID = " + messageID;
        console.log(queryString);
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            queryString = "select * from outbound a, user" + id + " b where a.ID = b.ID";
            connection.query(queryString, function(err, rows, fields) {
                if (err) throw err;
                console.log(rows[0].message);
                res.send(rows);
            });
        });
    }
};