var fs = require('fs');
var path = require('path');

module.exports = {
	createFile: function(fileTitle)
	{
		fs.open(path.resolve(__dirname+"/../resources/"+fileTitle+".txt"), 'w', function(err){
			if(err) throw err;
			console.log('File Created');
		});
	},
	writeFile: function(fileTitle, content)
	{
		fs.writeFile(path.resolve(__dirname+"/../resources/"+fileTitle+".txt"), content, function(err){
			if(err) throw err;
			console.log('Content saved.');
		});
	},
	deleteFile: function(fileTitle)
	{
		fs.unlink(path.resolve(__dirname+"/../resources/"+fileTitle+".txt"), function(err)
		{
			if(err) throw err;
		});
	}
}