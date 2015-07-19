// SERVER-SIDE JS

// REQUIREMENTS

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	_ = require('underscore'),
	db = require('./models/models'),
	mongoose = require('mongoose');

// connect db
mongoose.connect('mongodb://localhost/darkroom');

// server js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser for handling data
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

// ROUTES //

// root route (serves index.html, create.html, gallery.html)
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/create', function(req, res) {
	res.sendFile(__dirname + '/public/views/create.html');
});

app.get('/gallery', function(req, res) {
	res.sendFile(__dirname + '/public/views/gallery.html');
});

app.get('/images/:name', function(req, res) {
	res.sendFile(__dirname + '/public/images/' + req.params.name);
});

// POST ROUTE FOR CREATING NEW EDITED images
app.post('/api/photos', function(req, res) {

	var rawImageData = req.body.imageData;
	rawImageData = rawImageData.replace('data:image/png;base64,', '');
	rawImageData = rawImageData.replace(' ', '+');

	var imageData = new Buffer(rawImageData, 'base64');

	var newPhoto = new db.Photo ({
		img: {
			data: imageData,
			contentType: 'image/png'
		},
		text: req.body.text,
		author: req.body.author
	});

	newPhoto.save(function(err, savedPhoto) {
		console.log("error(?): " + err);
		res.json(savedPhoto);
	});
});

app.get('/photos/:id', function(req, res) {

	var photoId = req.params.id;
	db.Photo.findOne({_id: photoId}, function(err, foundPhoto) {
		res.set('Content-Type', 'image/png');
		res.send(foundPhoto.img.data);
	});

});

app.listen(3000, function() {
	console.log('Server started on localhost:3000');
});
