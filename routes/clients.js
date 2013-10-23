/*
 * Consultant REST API
 */


var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('cbbDb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'cbbDb' database");
        db.collection('clients', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'clients' collection doesn't exist.");
            }
            db.close();
        });
    }
});

exports.getClientById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving client: ' + id);
    db.collection('clients', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.getClients = function(req, res) {
    db.collection('clients', function(err, collection) {
        collection.find().sort({name:1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addClient = function(req, res) {
    var client = req.body;
    console.log('Adding client: ' + JSON.stringify(client));
    db.collection('clients', function(err, collection) {
        collection.insert(client, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateClient = function(req, res) {
    var id = req.params.id;
    var client = req.body;
    console.log('Updating client: ' + id);
    console.log(JSON.stringify(client));
    db.collection('clients', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, client, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating client: ' + err);
                res.send({'error':'Error updating client: ' + err});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(client);
            }
        });
    });
}

exports.deleteClient = function(req, res) {
    var id = req.params.id;
    console.log('Deleting client: ' + id);
    db.collection('clients', function(err, collection) {
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

