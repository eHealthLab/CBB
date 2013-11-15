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
            if(rows[0] != undefined){
                if(rows[0].email == id && rows[0].password == pwd)
                    res.send(rows);
                else
                    res.send("false");
            }
            else res.send("false");
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

exports.oneEmail = function(req, res) {
    var id = req.params.id;
    if(connection) {
        var queryString ="select * from participants where email = ?";
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            if(rows[0] != undefined){
                if(rows[0].email == id)
                    res.send(rows[0].ID);
                else
                    res.send("false");
            }
            else res.send("false");
        });
    }
};

exports.addUser = function(req, res){
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var email = req.params.email;
    var password = req.params.password;
    var phoneNumber = req.params.phoneNumber;
    if(connection) {
        var queryStringGet = "select * from participants where email = ?";
        connection.query(queryStringGet, [email], function(err, rows, fields) {
            if(err) throw err;
            if(rows[0] != undefined){
                console.log("Email Exists");
                var data = {
                    status: "false",
                    message: "Email ID exists. Use a different Email ID."
                };
                res.send(data);
            } else {
                console.log("Email doesn't exist");
                var queryString = "insert into participants (firstname, lastname, email, password, phonenumber) values('" + firstname + "', '" + lastname + "', '" + email + "', '" + password + "', '" + phoneNumber + "')";
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    queryStringGet = "select * from participants where email = ?";
                    connection.query(queryStringGet, [email], function(err, rows, fields) {
                        if(err) throw err;
                        var id = rows[0].ID
                        queryString = "create table user" + id + " (ID int auto_increment, inb varchar(30), outb boolean, foreign key(ID) references outbound(ID), primary key(ID));";
                        connection.query(queryString, function(err, rows, fields) {
                            if (err) throw err;
                            queryString = "select max(ID) as maxID from outbound;"
                            connection.query(queryString, function(err, rows, fields) {
                                if (err) throw err;
                                queryString = "insert into user" + id + "(outb) values (0)";
                                for (i=0; i<rows[0].maxID - 1; i++)
                                    queryString = queryString + ", (0)";
                                console.log(queryString);
                                connection.query(queryString, function(err, rows, fields) {
                                    if (err) throw err;
                                    var data = {
                                        status: "true"
                                    };
                                    res.send(data);
                                });
                            });
                        });
                    });
                });
            }
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
