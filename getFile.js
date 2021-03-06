//Declare Requirements
//var request = require('request')
var https   = require('https');
var fs      = require('fs');

//request = request.defaults({proxy: process.env.HTTP_PROXY });
var options = {
	//proxy: 'process.env.HTTP_PROXY', //not sure if this has any effect
	proxy: 'process.env.HTTPS_PROXY',
	hostname  : 'codeload.github.com',
	port      : 443,
	path      : '/wet-boew/wet-boew/zip/master',
	method    : 'GET'
};

var file = fs.createWriteStream("test_folder/master.zip");
 
//Pass the response through the callback and save it locally
var req = https.request(options, function(res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);
	res.on('data', function(data) {
		file.write(data);
	});
});
req.end();
 
req.on('error', function(err) {
	console.error(err);
});

