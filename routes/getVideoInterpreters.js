// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;

	getVideoInterpreters(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

function getVideoInterpreters(userId, callback) {
	console.log("Invoked: getVideoInterpreters");

    // Check that input is not null
    if(userId == undefined) {
		callback({ "success": false, "message": "userId not supplied, but required" });
		return;
	}

    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
    var query;
    // # get video interpreter list
    query = `SELECT full_name, skype_username FROM user
     		WHERE is_interpreter = 1 AND ok_to_chat = 1
		ORDER BY last_active_time DESC;`;

    // Get database connection and run query
	db.get().query(query, userId, function(err, rows) {
        if (err) {
            console.log(err);
            callback({ "success": false, "message": "something went wrong in the db." });
            return;
        }

		callback(rows);
        db.get().end();
	});
    console.log("Finished: getVideoInterpreters");
}

module.exports = router;
