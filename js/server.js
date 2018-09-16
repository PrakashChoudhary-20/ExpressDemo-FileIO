var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var textRoutes = require('./textTransfer.js');

app.get('/', function(req, res){
	res.sendFile(path.resolve(__dirname + "/../html/index.html"));
});

app.use('/text', textRoutes);

var server = app.listen(9999, function(){
	console.log('Server is listening on port 9999');
});