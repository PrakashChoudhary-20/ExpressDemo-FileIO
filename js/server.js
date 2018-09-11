var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var fileTitle = "";

app.get('/', function(req,res){
res.sendFile(path.resolve(__dirname + "/../html/index.html"));
});

app.post('/create', urlencodedParser, function(req,res){
	response = {
      filename:req.body.fileName
   };

   fileTitle = response.filename;
   createFile(fileTitle);
   res.sendFile(path.resolve(__dirname + "/../html/content.html"));
});

app.post('/addText' , urlencodedParser, function(req,res){
	response = {
		content:req.body.content
	};
	writeFile(fileTitle, response.content);
	res.write("You can view your contents here - http://"+req.headers.host + "/read/?fetch="+fileTitle);
	res.send();
});

app.get('/read/', function(req, res){
	res.writeHead(200,{"Content-Type" : "text/html"});
	response = {
      file:req.query.fetch
   };

	fs.readFile(path.resolve(__dirname+"/../resources/"+response.file+".txt"), function(err, data){
		if(err) throw err;
		res.write("<h2>Contents from your file are:</h2>\n\n");
		res.write("<textarea rows='4' cols='50' readonly>" + data + "</textarea>");
		res.write("\n\n\n");
		res.write("<h6><i>Now as you have read your contents. You will no longer be able to access the same contents.</i></h6>");
		res.send();
	});

	deleteFile(response.file);
});

var server = app.listen(9999, function(){
	console.log('Server is listening on port 9999');
})

function createFile(fileTitle)
{
   fs.open(path.resolve(__dirname+"/../resources/"+fileTitle+".txt"), 'w', function(err){
   	if(err) throw err;
   	console.log('File Created');
   });
}

function writeFile(fileTitle, content)
{
	fs.writeFile(path.resolve(__dirname+"/../resources/"+fileTitle+".txt"), content, function(err){
		if(err) throw err;
		console.log('Content saved.');
	});
}

function deleteFile(fileTitle)
{
	fs.unlink(path.resolve(__dirname+"/../resources/"+fileTitle+".txt"), function(err)
		{
			if(err) throw err;
		});
}