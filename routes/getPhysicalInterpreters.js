// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;
    var userLat = req.query.userLat;
    var userLong = req.query.userLong;

	getPhysicalInterpreters(userId,userLat, userLong, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

function getPhysicalInterpreters(userId, userLat, userLong, callback) {
	console.log("Invoked: getPhysicalInterpreters");

    // Check that input is not null
    if(userId == undefined) {
		callback({ "success": false, "message": "userId not supplied, but required" });
		return;
	}
	if (userLat == undefined || userLong == undefined) {
		callback({ "success": false, "message": "userLocLat and/or userLocLong not supplied, but required." });
	    return;
	}

    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
    var query;
    // # get video interpreter list
    query = `SELECT full_name, skype_username, last_known_location_lat, last_known_location_long FROM user
		WHERE is_interpreter = 1 AND ok_to_show_location = 1;`;

    // Get database connection and run query
	db.get().query(query, userId, function(err, rows) {
        if (err) {
            console.log(err);
            callback({ "success": false, "message": "something went wrong in the db." });
            return;
        }

		callback(rows);
	});

    console.log("Finished: getPhysicalInterpreters");
}

module.exports = router;
