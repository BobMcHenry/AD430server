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
    var radius = req.query.radius;

	getPhysicalInterpreters(userId,userLat, userLong, radius, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

function getPhysicalInterpreters(userId, userLat, userLong, radius, callback) {
	console.log("Invoked: getPhysicalInterpreters");

    // Check that input is not null
    if(userId == undefined) {
		callback({ "success": false, "message": "userId not supplied, but required" });
		return;
	}
	if (userLat == undefined || userLong == undefined) {
		callback({ "success": false, "message": "userLat and/or userLong not supplied, but required." });
	    return;
	}

    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
    var query;
    // # get video interpreter list
    query = `SELECT full_name, skype_username, last_known_location_lat, last_known_location_long FROM user
		WHERE is_interpreter = 1 AND ok_to_show_location = 1 ;`;

    // Get database connection and run query
	db.get().query(query, userId, function(err, rows) {
        if (err) {
            console.log(err);
            callback({ "success": false, "message": "something went wrong in the db." });
            return;
        }
        if (radius == undefined){
		  callback(rows);
        } else {
            var output = [];
            var outputLength = 0;
            for (var i = 0; i < rows.length; i++){
                console.log(rows[i]);
                var distance = haversine(userLat, userLong, rows[i].last_known_location_lat, rows[i].last_known_location_long);
                if ( distance <= radius){
                    rows[i].distance = distance;
                    output.push(rows[i]);
                }
            }
            db.get().end();
            callback(output); 
        }
        
	});
    console.log("Finished: getPhysicalInterpreters");
}

// LatLon to distance formula
function haversine(lat1, lon1, lat2, lon2){
    var R = 6371; // km
    var milePerKm = 0.621371;
    var latRad1 = lat1*(Math.PI/180);
    var latRad2 = lat2*(Math.PI/180);
    var deltalatRad = (lat2-lat1)*(Math.PI/180);
    var deltalonRad = (lon2-lon1)*(Math.PI/180);

    var a = Math.sin(deltalatRad/2) * Math.sin(deltalatRad/2) +
            Math.cos(latRad1) * Math.cos(latRad2) *
            Math.sin(deltalonRad/2) * Math.sin(deltalonRad/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    return d*milePerKm;
}

module.exports = router;
