
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;

	getSkypeName(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

// Get skype_username value for a user with the given userId
function getSkypeName(userId, callback) {
    console.log("Invoked: getSkypeName");

	// Check your input is not null
	if (userId == undefined)
	{
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
            // Get skype_username
    		db.get().query('SELECT skype_username FROM user WHERE user_id = ?', userId, function(err, rows) {
                if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}
				db.get().end();
    			callback(rows);
    		});
        }
	});
    console.log("Finished: getSkypeName");
};

module.exports = router;
