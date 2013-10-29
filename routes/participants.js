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
    var pwd = req.params.pwd;
    if (connection) {
        var queryString = "select * from participants where email = ?";
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            if(rows[0].email == id && rows[0].password == pwd)
                res.send("true");
            else
                res.send("false");
        });
    }
};

exports.checkEmail = function(req, res){
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
}

exports.addUser = function(req, res){
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var email = req.params.email;
    var password = req.params.password;
    //var passwordConfirm = req.body.passwordConfirm;
    if(connection) {
        var queryString = "insert into participants values('" + firstname + "', '" + lastname + "', '" + email + "', '" + password + "', '" + password + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
};