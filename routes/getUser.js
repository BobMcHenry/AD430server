
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;

	getUser(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

// Get a user with the given id
function getUser(userId, callback) {
	console.log("Invoked: getUser");

    // Check that input is not null
    if (userId == undefined) {
		callback({ "success": false, "message": "userId not supplied, but required" });
		return;
	}

    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
    var query;

    // Get all user data
    query = `SELECT * FROM user WHERE user_id = ?`;

    // Get database connection and run query
	db.get().query(query, userId, function(err, rows) {
        if (err) {
            callback({ "success": false, "message": "something went wrong in the db." });
        }

		callback(rows);
	});

    console.log("Finished: getUser");
}

module.exports = router;
