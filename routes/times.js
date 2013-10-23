/*
 * Time REST API
 */


var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('radiologyDb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'radiologyDb' database");
        db.collection('times', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'time' collection doesn't exist.");
            }
        });
    }
});

exports.getTimeById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving time: ' + id);
    db.collection('times', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.getTimes = function(req, res) {

    var startDate = undefined;
    var endDate = undefined;
    var consultantId = undefined;
    if (req.param('start') != undefined) {
        startDate = new Date(req.param('start'));
    }
    if (req.param('end') != undefined) {
        endDate = new Date(req.param('end'));
    }
    if (req.param('consultant') != undefined) {
        consultantId = req.param('consultant');
    }

    // build the query block
    var query = {};
    if (consultantId) {
        query.consultant_id = consultantId;
    }
    if (startDate || endDate) {
        query.date = {};
    }
    if (startDate) {
        query.date.$gte = startDate;
    }
    if (endDate) {
        query.date.$lt = endDate;
    }
       console.log(query);
    db.collection('times', function(err, collection) {
        collection.find(query).sort({date:-1}).toArray(function(err, items) {
            res.send(items);
        });
    });

};

exports.addTime = function(req, res) {
    var time = req.body;
    time.date = new Date(time.date);
    console.log('Adding time: ' + JSON.stringify(time));
    db.collection('times', function(err, collection) {
        collection.insert(time, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateTime = function(req, res) {
    var id = req.params.id;
    var time = req.body;
    time.date = new Date(time.date);
    console.log('Updating time: ' + id);
    console.log(JSON.stringify(time));
    db.collection('times', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, time, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating time: ' + err);
                res.send({'error':'Error updating time: ' + err});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(time);
            }
        });
    });
}

exports.deleteTime = function(req, res) {
    var id = req.params.id;
    console.log('Deleting time: ' + id);
    db.collection('times', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

