
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;
	var skypeName = req.query.skypeName;

	setSkypeName(userId, skypeName, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

// Set a skype_username value for a user with the given userId
function setSkypeName(userId, skypeName, callback) {
    console.log("Invoked: setSkypeName");

	// Check your input is not null
	if (userId == undefined)
	{
		callback({ "success": false, "message": "userId was not supplied, but is required" });
		return;
	}
	if (skypeName == undefined)
	{
		callback({ "success": false, "message": "skypeName was not supplied, but is required" });
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
            // Update skype_username
    		db.get().query('UPDATE user SET skype_username = ? WHERE user_id = ?', [skypeName, userId], function(err,res) {
                if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}

    			callback({ "success": true, "user_id": userId });
    		});
        }
        db.get().end();
	});
    console.log("Finished: setSkypeName");
};

module.exports = router;
