/*var express = require("express");*/
//var bodyParser = require("body-parser");
//var couchbase = require("couchbase");
//var path = require("path");
//var config = require("./config");
var app = require('express')();
const { exec } = require('child_process');

var server = require("http").Server(app);
var io = require("socket.io").listen(server);
var http = require('http'),
    fs = require('fs');
    var opn = require('opn');




//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);


//var routes = require("./routes/routes.js")(app);
//var ChatModel = require("./models/chatmodel.js");
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

app.get('/cmd', function(req, res){

    exec('"C:\/Program Files (x86)\/Microsoft Office\/Office16\/POWERPNT.exe" /S  C:\/Users\/BilelBM\/Desktop\/p.pptx', (err, stdout, stderr) => {
    
    if (err) {
        // node couldn't execute the command
        console.log(err);
        return;
      }
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    res.sendFile(__dirname + '/client.html');
});

server.listen(3300, function () {
    console.log("Listening on port %s...", server.address().port);
});

