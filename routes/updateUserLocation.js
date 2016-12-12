
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var userId = req.query.userId;
	var userLocLat = req.query.userLocLat;
	var userLocLong = req.query.userLocLong;

	updateUserLocation(userId, userLocLat, userLocLong, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

// Update the user location (lat, long) and update time for the given id
function updateUserLocation(userId, userLocLat, userLocLong, callback) {
	console.log("Invoked: updateUserLocation");

	// Check that input is not null
	if (userId == undefined) {
		callback({ "success": false, "message": "userId not supplied, but required." });
		return;
	}
	if (userLocLat == undefined || userLocLong == undefined) {
		callback({ "success": false, "message": "userLocLat and/or userLocLong not supplied, but required." });
	}

	// Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
	var query;

	// Check that userId is valid
	query = `SELECT COUNT(*) AS isGood FROM user WHERE user_id = ?`;

	// Get database connection and run query
	db.get().query(query, userId, function(err, rows) {
		if (err) {
			console.log(err);
			callback({ "success": false, "message": "something went wrong in the db." });
			return;
		}
		if (rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given userId cannot be found." });
			return;
		} else {
			// Update user location (lat, long) and update time for the given id
			query = `UPDATE user SET last_known_location_lat = ?, last_known_location_long = ?, last_location_update = NOW()
					WHERE user_id = ?`;

			// Get database connection and run query
			db.get().query(query, [userLocLat, userLocLong, userId], function(err, res) {
				if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}

				callback({ "success": true, "userId": userId });
			});
		}
		db.get().end();
	});
    console.log("Finished: updateUserLocation");
}

module.exports = router;
