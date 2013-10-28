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
    var id = req.params.id;
    if (connection) {
        var queryString = "select * from participants where email = ?";
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            //console.log(rows[0].firstname)
            res.send(rows[0]);
            /*res.contentType('application/json');
             res.write(JSON.stringify(rows));
             res.end();*/
        });
    }
};