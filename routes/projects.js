/*
 * Consultant REST API
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
        db.collection('projects', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'projects' collection doesn't exist.");
            }
        });
    }
});

exports.getProjectById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving client: ' + id);
    db.collection('projects', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.getProjects = function(req, res) {
    db.collection('projects', function(err, collection) {
        collection.find().sort({name:1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProject = function(req, res) {
    var project = req.body;
    console.log('Adding project: ' + JSON.stringify(project));
    db.collection('projects', function(err, collection) {
        collection.insert(project, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProject = function(req, res) {
    var id = req.params.id;
    var project = req.body;
    console.log('Updating project: ' + id);
    console.log(JSON.stringify(project));
    db.collection('projects', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, project, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating project: ' + err);
                res.send({'error':'Error updating project: ' + err});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(project);
            }
        });
    });
}

exports.deleteProject = function(req, res) {
    var id = req.params.id;
    console.log('Deleting project: ' + id);
    db.collection('projects', function(err, collection) {
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

