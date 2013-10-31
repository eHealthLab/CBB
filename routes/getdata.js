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
    if (connection) {
        var queryString = "select * from outbound";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            console.log(rows[0].message);
            res.send(rows);
        });
    }
};

/*exports.checkEmail = function(req, res){
 var email = req.params.email;
 if (connection) {
 var queryString = "select * from participants where email = ?";
 connection.query(queryString, [email], function(err, rows, fields) {
 if (err) throw err;
 if(rows[0].email == email)
 res.send("true");
 else
 res.send("false");
 });
 }
 }*/

exports.addUser = function(req, res){
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var email = req.params.email;
    var password = req.params.password;
    if(connection) {
        var queryString = "insert into participants values('" + firstname + "', '" + lastname + "', '" + email + "', '" + password + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
};

exports.addFeedback = function(req, res){
    var feedback = req.params.feedback;
    if(connection) {
        var queryString = "insert into feedback values('" + feedback + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
};
/**
 * Created by hemanth on 10/31/13.
 */
