var mysql = require('mysql');

var openConnection = function() {
    return mysql.createConnection({ host: 'localhost', user: 'munjala',
        password: 'artika12', database: 'cbbdb'});
};

exports.all = function(req, res){
    if ((connection = openConnection())) {
        connection.query('select * from participants', function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
    connection.end();
};

exports.one = function(req, res){
    var id = req.params.id;
    var pwd = req.params.pwd;
    if ((connection = openConnection())) {
        console.log("Open");
        var queryString = "select * from participants where email = ?";
        console.log("Running");
        connection.query(queryString, [id], function(err, rows, fields) {
            console.log("Entered function");
            if (err) throw err;
            if(rows[0] != undefined){
                console.log("Entered IF");
                if(rows[0].email == id && rows[0].password == pwd)
                    res.send(rows);
                else
                    res.send("false");
            }
            else res.send("false");
        });
    }
    console.log("Clone");
    connection.end();
};

/*exports.checkEmail = function(req, res){
    var email = req.params.email;
    if ((connection = openConnection())) {
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
    if((connection = openConnection())) {
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
    connection.end();
};

exports.addUser = function(req, res){
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var email = req.params.email;
    var password = req.params.password;
    var phoneNumber = req.params.phoneNumber;
    if((connection = openConnection())) {
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
                var startDate =new Date(2013, 10, 20);    //Month is 0-11 in JavaScript
                var thisday = new Date();                        //Get 1 day in milliseconds
                var one_day=1000*60*60*24
                var daysSinceStart = ((thisday.getTime() - startDate.getTime())/one_day) % 30;
		        console.log(daysSinceStart);
                var queryString = "insert into participants (firstname, lastname, email, password, phonenumber, registerday, allmessages, registerdate) values('" + firstname + "', '" + lastname + "', '" + email + "', '" + password + "', '" + phoneNumber + "', " + daysSinceStart + ", false, now())";
                connection = openConnection();
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    queryStringGet = "select * from participants where email = ?";
                    connection = openConnection();
                    connection.query(queryStringGet, [email], function(err, rows, fields) {
                        if(err) throw err;
                        var id = rows[0].ID
                        queryString = "create table user" + id + " (ID int auto_increment, inb varchar(30), outb boolean, foreign key(ID) references outbound(ID), primary key(ID));";
                        connection = openConnection();
                        connection.query(queryString, function(err, rows, fields) {
                            if (err) throw err;
                            queryString = "select max(ID) as maxID from outbound;"
                            connection = openConnection();
                            connection.query(queryString, function(err, rows, fields) {
                                if (err) throw err;
                                queryString = "insert into user" + id + "(outb) values (0)";
                                for (i=0; i<rows[0].maxID - 1; i++)
                                    queryString = queryString + ", (0)";
                                //console.log(queryString);
                                connection = openConnection();
                                connection.query(queryString, function(err, rows, fields) {
                                    if (err) throw err;
                                    var data = {
                                        status: "true"
                                    };
                                    res.send(data);
                                });
                                connection.end();
                            });
                            connection.end();
                        });
                        connection.end();
                    });
                    connection.end();
                });
                connection.end();
            }
        });
    }
    connection.end();
};

exports.addFeedback = function(req, res){
    var feedback = req.params.feedback;
    if((connection = openConnection())) {
        var queryString = "insert into feedback values('" + feedback + "')";
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            res.send("success");
        });
    }
    connection.end();
};
