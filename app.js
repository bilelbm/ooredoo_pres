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



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);


//var routes = require("./routes/routes.js")(app);
//var ChatModel = require("./models/chatmodel.js");



var presenter = "";
var pc_client = "";
app.get('/presenter.html', function(req, res){
  res.sendFile(__dirname + '/presenter.html');
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on("connection", function(socket){
	console.log("got new connexion");
	socket.on("pc_client", function(data){
			if(pc_client=="") {
				pc_client = socket.id;
				console.log("i have a new pc_client "+socket.id)
			}
			else {

				console.log("i have already a pc_client get out ");
			}
		});
	socket.on("presenter", function(data){
				if(presenter=="") {
					presenter = socket.id;
					console.log("i have a new presenter "+socket.id)
				}
				else {

					console.log("i have already a presenter get out ");
				}
			});
    socket.on("event", function(data){
    		console.log("received event ")
    		console.log(data)
    		switch(data){
    			case "1" : socket.broadcast.emit('play_video', '7VaMrs8n8e4'); 
    					//console.log("emitted play_video");
    					//io.to(presenter).emit('from_client','you see me ?');
    					//console.log("informed host of new client");
    					break;
				case "2" : socket.broadcast.to(pc_client).emit('cmd', '7VaMrs8n8e4'); 	
						break;
				case "3" : socket.broadcast.emit('open_link', 'http://knsd.digital'); 	
						break;	
				case "4" : socket.broadcast.emit('open_image', 'https://i.imgur.com/KnfdyQy.jpg'); 	
						break;	
    		}
            //io.emit("chat_message", msg);
        //});
    });
    socket.on("disconnect", function(data){
		console.log(socket.id+" disconnected ");
		if(presenter==socket.id) {
			console.log("ALERT : presenter disconnected");
			presenter="";
		}else if(pc_client == socket.id){
			console.log("ALERT : pc client disconnected");
			pc_client="";
		}
	});
});

server.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
