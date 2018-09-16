var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var fileOperations = require('./io.js');
var fs = require('fs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var fileTitle = "";

router.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname + "/../html/textBase.html"));
});

router.post('/create', urlencodedParser, function(req,res){
	response = {
      filename:req.body.fileName
   };
   fileTitle = response.filename;
   fileOperations.createFile(fileTitle);
   res.sendFile(path.resolve(__dirname + "/../html/content.html"));
});

router.post('/addText' , urlencodedParser, function(req,res){
	response = {
		content:req.body.content
	};
	fileOperations.writeFile(fileTitle, response.content);
	res.write("You can view your contents here - http://"+req.headers.host + "/text/read/"+fileTitle);
	res.send();
});

router.get('/read/:title', function(req, res){
	res.writeHead(200,{"Content-Type" : "text/html"});
	response = {
      file:req.params.title
   };

	fs.readFile(path.resolve(__dirname+"/../resources/"+response.file+".txt"), function(err, data){
		if(err) throw err;
		res.write("<h2>Contents from your file are:</h2>\n\n");
		res.write("<textarea rows='4' cols='50' readonly>" + data + "</textarea>");
		res.write("\n\n\n");
		res.write("<h6><i>Now as you have read your contents. You will no longer be able to access the same contents.</i></h6>");
		res.send();
	});

	fileOperations.deleteFile(response.file);
});

module.exports = router;