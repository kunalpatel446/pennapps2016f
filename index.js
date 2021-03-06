var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

var db = MongoClient.connect("penn_db");
//get random from 1 to 100000
//return "num : {x,y}" from mongo

var num;
var url = 'mongodb://ec2-54-211-134-229.compute-1.amazonaws.com/penn_db';
var Message;
var collection;
var prometheus = require("prometheus-wrapper");
prometheus.setNamespace("myapp");

app.get('/metrics', function(req, res) {
    res.end(prometheus.getMetrics());
});

prometheus.createSummary("mysummary", "Compute quantiles and median of a random list of numbers.", {
    percentiles: [ 0.99 ]
});


app.get('/read/', function (req, res) {
    num = (Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001).toString()
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var findDocuments = function(db, callback) {
    	// Get the documents collection
    	collection = db.collection('bal1');
    	collection.find({'_id': num}).toArray(function(err, docs) {
    	    assert.equal(err, null);
    	    //console.log("Found the following records");
    	    //console.log(req.query.time);
            Message = docs;
    	    callback(docs);
            //res.send("helloder");
            res.send(req.query.time);
    	});
        }
        findDocuments(db,function(){
    	   db.close();
        });
    });
})

//get random from 1 to 100000
//get value of x and y from mongo
//hash the values and update mongo
//return new values without a read to mongo
// app.get('/update', function(req, res) {
//     num = (Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001).toString()
//     MongoClient.connect(url, function(err, db) {
//         assert.equal(null, err);
//         console.log("Connection successful");
//         var updateDocuments = function(db, callback) {
//         // Get the documents collection
//             collection = db.collection('bal1');
//             collection.update({'_id': num}, { $set: {'_id' : (Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001).toString(function(err, docs){
//                 assert.equal(err, null);
//                 assert.equal(1, results.result.n);
//                 console.log("Found the following records");
//                 console.log(docs);
//                 Message = docs;
//                 callback(docs);
//             });
//             )}}
//         }
//         updateDocuments(db,function(){
//         db.close();
//         });
//     });
//   callback.send(Message);
// })

var server = app.listen(8081, function (err) {
    assert.equal(err,null);
    var host = server.address().address
    var port = server.address().port
    //console.log("Example app listening at http://%s:%s", host, port)
})
