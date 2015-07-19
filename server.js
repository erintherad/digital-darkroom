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
app.use(bodyParser.urlencoded({extended: true}));



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

app.listen(3000, function() {
	console.log('Server started on localhost:3000');
});
