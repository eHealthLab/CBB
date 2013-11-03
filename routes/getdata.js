var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'munjala',
    password: 'artika12', database: 'cbbdb'});

exports.all = function(req, res){
    if (connection) {
        connection.query('select * from participants', function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.one = function(req, res){
    var email = req.params.email;
    if (connection) {
        var queryString = "select * from outbound, inbound a where a.email = '" + email + "'";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows[0].message);
            res.send(rows);
        });
    }
};

exports.addMessage = function(req, res) {
    var message = req.params.message;
    var email = req.params.email;
    if(connection) {
        var queryString = "update inbound set inb3 = '" + message + "'  where email = '" + email + "'";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            queryString = "select * from outbound, inbound a where a.email = '" + email + "'";
            connection.query(queryString, function(err, rows, fields) {
                if (err) throw err;
                console.log(rows[0].message);
                res.send(rows);
            });
        });
    }
};
