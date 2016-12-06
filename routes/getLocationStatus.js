
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var userId = req.query.userId;

	getUserLocation(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

// Get the user location for the given id
function getUserLocation(userId, callback) {
	console.log("Invoked: getLocationStatus");

	// Check that input is not null
	if (userId == undefined) {
		callback({ "success": false, "message": "userId not supplied, but required." });
		return;
	}

	// Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
	var query;

	// Check that userId is valid
	query = `SELECT COUNT(*) AS isGood
			FROM user WHERE user_id = ?`;

	// Get database connection and run query
	db.get().query(query, userId, function(err, rows) {
		if (err) {
			console.log(err);
			callback({ "success": false, "message": "something went wrong in the db." });
			return;
		}
		// Check userId is valid
		if (rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given userId cannot be found." });
			return;
		} else {
			// Get user location (lat, long) and last update time
			query = `SELECT ok_to_show_location FROM user WHERE user_id = ?`;

			// Get database connection and run query
			db.get().query(query, userId, function(err, rows) {
				if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}

				// change ok_to_chat from 0/1 to false/true
				rows[0].ok_to_show_location = (rows[0].ok_to_show_location) ? true : false;
				callback(rows[0]);
			});
		}
	});

    console.log("Finished: getLocationStatus");
}

module.exports = router;
