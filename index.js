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
app.get('/read', function (req, res) {
    num =  (Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001).toString()
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log ("Connection successful");
        var findDocuments = function(db, callback) {
    	// Get the documents collection
    	var collection = db.collection('bal1');
    	collection.find({'_id': num}).toArray(function(err, docs) {
    	    assert.equal(err, null);
    	    console.log("Found the following records");
    	    console.log(docs);
            Message = docs;
    	    callback(docs);
    	});
        }
        findDocuments(db,function(){
    	db.close(); 
        });
    });
  res.send(Message);
})

//get random from 1 to 100000
//get value of x and y from mongo
//hash the values and update mongo
//return new values without a read to mongo
app.get('/update', function(db, callback) {
    num = (Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001).toString()
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log ("Connection successful");
        var updateDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('bal1');
        collection.update({'_id': num}, {$set: {'_id': (Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001).toString()}}, function(err, result){
            assert.equal(1, result.result.n);
            console.log("Found the following records");
            console.log(docs);
            Message = docs;
            callback(result);
        });
        }
        updateDocuments(db,function(){
        db.close();
        });
    });
  callback.send(Message);
})

var server = app.listen(8081, function (err) {
    assert.equal(err,null);
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
