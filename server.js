// SERVER-SIDE JS

// REQUIREMENTS

var express = require('express'),
	app = express();

// server js and css files from public folder
app.use(express.static(__dirname + '/public'));


// ROUTES //

// root route (serves index.html, create.html, gallery.html)
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/create.html');
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Server started on localhost:3000');
});
