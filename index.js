var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

var db = MongoClient.connect("penn_db");
//get random from 1 to 100000
//return "num : {x,y}" from mongo

var num =  Math.floor(Math.random() * (100000 - 1001 + 1)) + 1001;
var url = 'mongodb://ec2-54-211-134-229.compute-1.amazonaws.com';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log ("Connection successful");
    var findDocuments = function(db, callback) {
	// Get the documents collection
	var collection = db.collection('bal1');
	collection.find().toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs);
	    callback(docs);
	});
    }
    findDocuments(db,function(){
	db.close();
    });
});

app.get('/read', function (req, res) {
    res.send('Hello World');
})

//get random from 1 to 100000
//get value of x and y from mongo
//hash the values and update mongo
//return new values without a read to mongo
app.get('/update', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})