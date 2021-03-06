
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var userId = req.query.userId;

	updateUserLastActive(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Update the user's last active time to now
function updateUserLastActive(userId, callback) {
	console.log("Invoked: updateUserLastActive");

	// Check your input is not null
	if (userId == undefined) {
		callback({ "success": false, "message": "userId was not supplied, but is required" });
		return;
	}

	// Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

    // Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ?', userId, function(err, rows) {
		if (err) {
			console.log(err);
			callback({ "success": false, "message": "something went wrong in the db." });
			return;
		}
		// Check your userId is valid
		if (rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given userId cannot be found." });
		} else {
            // Update user last_active_time
    		db.get().query('UPDATE user SET last_active_time = NOW() WHERE user_id = ?', userId, function(err,res) {
				if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}
				db.get().end();
    			callback({ "success": true, "user_id": userId });
    		});
        }

	});
	console.log("Finished: updateUserLastActive");
}

module.exports = router;
