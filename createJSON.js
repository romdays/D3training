var fs = require('fs');
var jsonfile = require('jsonfile');
var sleep = require('system-sleep');

var outputData = {};

fs.readdir('./public', function(err, files){
    if (err) throw err;
    var fileList = files.filter(function(file){
        return fs.statSync('./public/' + file).isDirectory();
    });
    fileList.forEach(file => outputData[file] = []);
    
    fileList.forEach(function(childFile, i) {
	    fs.readdir('./public/' + childFile, function(err, sonFiles){
		    if (err) throw err;
		    var sonFileList = sonFiles.filter(function(sonFile){
		    	return fs.statSync('./public/' + childFile + '/' + sonFile).isDirectory();
		    });

		    sonFileList.forEach(function(f){
			    outputData[childFile].push(f);
		    });

		    if(i === fileList.length - 1) {
		    	sleep(1000);
		    	jsonfile.writeFileSync('./public/data.json', outputData, {
				    encoding: 'utf-8', 
				    replacer: null, 
				    spaces: null
				});
		    	console.log('> Created data.json');
		    }
		});
	});
});

