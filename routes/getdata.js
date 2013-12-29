var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'munjala',
    password: 'artika12', database: 'cbbdb'});


exports.one = function(req, res){
    var finalMessages = new Array();
    console.log("Entered");
    var Id = req.params.id;
    if (connection) {
        var queryString = "select allmessages, registerdate from participants where ID=" + Id;
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            var registerDate = rows[0].registerdate;
            if (rows[0].allmessages) {
                console.log("entered allmessages");
                queryString = "select * from outbound a, user" + Id +" b where a.ID = b.ID";
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    res.send(rows);
                });
            } else {
                console.log("Entered all else");
                queryString = "select * from outbound a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    //if (rows[0] != undefined) {
                        if (rows[rows.length - 1].lastmessage) {
                            console.log("Last Message Check");
                            var abc1 = new Array();
                            var finalRows = new Array();
                            var startDate =new Date(2013, 10, 20);    //Month is 0-11 in JavaScript
                            var thisday = new Date();                        //Get 1 day in milliseconds
                            var one_day=1000*60*60*24
                            var daysSinceStart = ((thisday.getTime() - startDate.getTime())/one_day) % 30;
                            queryString = "select * from outbound a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                            connection.query(queryString, function(err, rows1, fields) {
                                console.log("Date Check");
                                if (err) throw err;
                                finalRows = rows1.slice(0);
                                finalMessages = rows1.slice(0);
                                rows1 = rows1.concat(rows);
                                console.log(rows1.length);
                                if(rows1.length == 26) {
                                    queryString = "update participants set allmessages = true where ID=" + Id;
                                    connection.query(queryString, function(err, rowdata, fields) {
                                        if (err) throw err;
                                    });
                                }
                                res.send(rows1);
                                //return rows1;
                            });
                        } else {
                            console.log("Not last message");
                            res.send(rows);
                        }
                    //}
                });
            }
        });
    }
};

exports.spanishone = function(req, res){
    var finalMessages = new Array();
    console.log("Entered");
    var Id = req.params.id;
    if (connection) {
        var queryString = "select allmessages, registerdate from participants where ID=" + Id;
        connection.query(queryString, function(err, rows, fields) {
            if (err) throw err;
            var registerDate = rows[0].registerdate;
            if (rows[0].allmessages) {
                console.log("entered allmessages");
                queryString = "select * from outboundspanish a, user" + Id +" b where a.ID = b.ID";
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    res.send(rows);
                });
            } else {
                console.log("Entered all else");
                queryString = "select * from outboundspanish a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday<=a.day AND a.releasedate<=now()";
                connection.query(queryString, function(err, rows, fields) {
                    if (err) throw err;
                    //if (rows[0] != undefined) {
                    if (rows[rows.length - 1].lastmessage) {
                        console.log("Last Message Check");
                        var abc1 = new Array();
                        var finalRows = new Array();
                        var startDate =new Date(2013, 10, 20);    //Month is 0-11 in JavaScript
                        var thisday = new Date();                        //Get 1 day in milliseconds
                        var one_day=1000*60*60*24
                        var daysSinceStart = ((thisday.getTime() - startDate.getTime())/one_day) % 30;
                        queryString = "select * from outboundspanish a, user" + Id + " b, (select registerday from participants where ID= " + Id + ") c where a.ID = b.ID AND c.registerday>a.day AND a.day<" + daysSinceStart;
                        connection.query(queryString, function(err, rows1, fields) {
                            console.log("Date Check");
                            if (err) throw err;
                            finalRows = rows1.slice(0);
                            finalMessages = rows1.slice(0);
                            rows1 = rows1.concat(rows);
                            if(rows1.length == 27) {
                                queryString = "update participants set allmessages = true where ID=" + Id;
                                connection.query(queryString, function(err, rowdata, fields) {
                                    if (err) throw err;
                                });
                            }
                            res.send(rows1);
                            //return rows1;
                        });
                    } else {
                        console.log("Not last message");
                        res.send(rows);
                    }
                    //}
                });
            }
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