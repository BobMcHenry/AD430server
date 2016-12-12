
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	getConvos(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Get and list all convos
function getConvos(callback) {
    console.log("Invoked: getConvos");

	// Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
	var query;

	// Get all convos
	query = `SELECT * FROM convo`;

	// Get database connection and run query
    db.get().query(query, function(err, rows) {
		if (err) {
			console.log(err);
			callback({ "success": false, "message": "something went wrong in the db." });
			return;
		}

        callback(rows);
    });
	db.get().end();
	console.log("Finished: getConvos");
}

module.exports = router;
