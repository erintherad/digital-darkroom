// SERVER-SIDE JS

// REQUIREMENTS

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	_ = require('underscore'),
	db = require('./models/models'),
	mongoose = require('mongoose'),
	User = require('./models/models'),
	session = require('express-session');

// server js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser for handling data
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// ROUTES //

// login route (renders login view)
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

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

// TESTING ONLY
// returns an image on the filesystem
app.get('/images/:name', function(req, res) {
	res.sendFile(__dirname + '/public/images/' + req.params.name);
});

// POST ROUTE FOR CREATING NEW EDITED images
app.post('/api/photos', function(req, res) {
	// boiling data down to pixel info
	var rawImageData = req.body.imageData;
	rawImageData = rawImageData.replace('data:image/png;base64,', '');
	rawImageData = rawImageData.replace(' ', '+');

	// Storing image data into buffer
	var imageData = new Buffer(rawImageData, 'base64');

	// new instance of photo
	var newPhoto = new db.Photo ({
		img: {
			data: imageData,
			contentType: 'image/png'
		},
		text: req.body.text,
		author: req.body.author
	});

	// Persist the image data into db
	newPhoto.save(function(err, savedPhoto) {
		console.log("error(?): " + err);
		// Respond with object to client
		res.json({
			'_id': savedPhoto._id,
			'text': savedPhoto.text,
			'author': savedPhoto.author
		});
	});
});

// find all edited photos in db
app.get('/api/photos', function(req, res) {
	db.Photo.find({}).select('text _id author').exec(function(err, photos) {
		res.json(photos);
	});
});

// get specific Photo models
app.get('/api/photos/:id', function(req, res) {
	var photoId = req.params.id;
	db.Photo.findOne({_id: photoId}).select('text _id author').exec(function(err, photo) {
		res.json(photo);
	});
});

// get image data only
app.get('/photos/:id', function(req, res) {
	var photoId = req.params.id;
	db.Photo.findOne({_id: photoId}, function(err, foundPhoto) {
		res.set('Content-Type', 'image/png');
		res.send(foundPhoto.img.data);
	});
});

// update existing photo posts
app.put('/api/photos/:id', function(req, res) {
	var photoId = req.params.id;
	db.Photo.findOne({_id: photoId}).select('text _id author').exec(function(err, foundPhoto) {
		foundPhoto.author = req.body.author;
		foundPhoto.text = req.body.text;

		foundPhoto.save(function(err, savedPhoto) {
			res.json(savedPhoto);
		});
	});
});

// delete post in gallery
app.delete('/api/photos/:id', function(req, res) {
	var photoId = req.params.id;
	db.Photo.remove({_id: photoId}).select('text _id author').exec(function(err, deletePhoto) {
		res.json(deletePhoto);
	});
});

// FUCKING AUTH //

// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.send('coming soon');
});

// user submits the signup form
app.post('/users', function(req, res) {
	// grab user data from params (req body)
	var newUser = req.body.user;

	// create new user with secure password
	User.createSecure(newUser.email, newUser.password, function(err, user) {
		res.send(user);
	});
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    // redirect to user create
    res.redirect('/gallery');
  });
});


mongoose.connect(
  process.env.MONGOLAB_URI || 'mongodb://localhost/darkroom'
);


app.listen(process.env.PORT || 3000, function() {
	console.log('Server started on localhost:3000');
});
