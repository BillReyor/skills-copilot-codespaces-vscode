// Create web server

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/comments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.info('Connected to database');
});

// Create schema
var commentSchema = mongoose.Schema({
	name: String,
	comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Create web server
var app = express();

// Add middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Add routes
app.get('/comments', function(req, res) {
	Comment.find(function(err, comments) {
		if (err) return console.error(err);
		res.json(comments);
	});
});

app.post('/comments', function(req, res) {
	var comment = new Comment(req.body);
	comment.save(function(err, comment) {
		if (err) return console.error(err);
		console.info('New comment saved');
		res.sendStatus(201);
	});
});

// Start web server
var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.info('Listening at http://%s:%s', host, port);
});