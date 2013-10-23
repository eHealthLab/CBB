/*
* Participant REST API
 */


var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('cbbDb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'cbb' database");
        db.collection('participants', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'participants' collection doesn't exist.");
            }
        });
    }
    else {
        console.log("connection error");
    }
});

exports.getParticipantById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving Participant: ' + id);
    db.collection('participants', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.getParticipant = function(req, res) {
    console.log('Listing participants:');
    db.collection('participants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addParticipant = function(req, res) {
    var participant = req.body;
    console.log('Adding participant: ' + JSON.stringify(participant));
    db.collection('participants', function(err, collection) {
        collection.insert(participant, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateParticipant = function(req, res) {
    var id = req.params.id;
    var participant = req.body;
    console.log('Updating participant: ' + id);
    console.log(JSON.stringify(participant));
    db.collection('participants', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, participant, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating participant: ' + err);
                res.send({'error':'Error updating participant: ' + err});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(participant);
            }
        });
    });
}

exports.deleteParticipant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting participant: ' + id);
    db.collection('participants', function(err, collection) {
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

