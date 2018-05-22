var manufacturer = ["iphone", "samsung", "nokia"];
var iphone = ["iPhone 6s", "iPhone 7", "iPhone 7 Plus", "iPhone 8", "iPhone 8 Plus", "iPhone X", "iPhone 5"];
var samsung = ["Samsung Galaxy S6", "Samsung Galaxy S8", "Samsung Galaxy S7", "Samsung Galaxy S9+"];
var nokia = ["Nokia 3310", "Nokia Lumia 850", "Nokia X", "Nokia XL"];

exports.models = function(manufacturerSelectedValue) {
	
	if (manufacturer.indexOf(manufacturerSelectedValue) !== -1) {
		var jsonModels = JSON.stringify(eval(manufacturerSelectedValue));
	}
	else {
		var emptyArray = [""];
		var jsonModels = JSON.stringify(emptyArray);
	}
	return jsonModels;
};

var http = require('http');
var dt = require('./returnModels');
formidable = require('formidable'),
util = require('util');

http.createServer(function (request, response) {
	if (request.method == 'POST') {
		var form = new formidable.IncomingForm();
		form.parse(request, function(err, fields, files) {
			var manufacturerSelectedValue = fields.manufacturer;
			response.setHeader('Access-Control-Allow-Origin', '*');
			response.writeHead(200, {'Content-Type': 'text/html'});	
			response.write(dt.models(manufacturerSelectedValue));
			response.end();
    	});	
	}
	else {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.writeHead(405, {'Content-Type': 'text/html'});	
		response.end();
	}
}).listen(8080);
