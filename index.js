var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

//get random from 1 to 100000
//return "num : {x,y}" from mongo
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