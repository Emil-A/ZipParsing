console.log("starting!");

//https://github.com/cthackers/adm-zip/wiki/ADM-ZIP
var AdmZip = require('adm-zip'); //npm install adm-zip

//Declare zip to extract, and create array of zip contents
var zip = new AdmZip("./test/master.zip");
zip.extractAllTo("test_folder/", true);

var zipEntries = zip.getEntries(); 

var fs = require('fs');
var writeStream = fs.createWriteStream("test_folder/zip_info.json");

//Write zip file information to json file
writeStream.once('open', function(fd) {
	//console.log(JSON.stringify(zipEntries)); 
	writeStream.write(JSON.stringify(zipEntries));
	writeStream.end();
});

//Read zip file info from json file
fs.readFile('test_folder/zip_info.json', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	console.log(JSON.parse(data));
});
