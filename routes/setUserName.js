// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var userId = req.query.userId;
	var fullName = req.query.fullName;

	setUserName(userId, fullName, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Set the updated name of the user
function setUserName(userId, fullName, callback) {
	console.log("Invoked: setUserName");

	//Check your input is not null
	// Consider adding some regex here if proper name construct is desired
	if(userId == undefined) {
		callback({ "success": false, "message": "userId was not supplied, but is required" });
		return;
	}
	if(fullName == undefined) {
		callback({ "success": false, "message": "name was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ?', userId, function(err,rows){
		//Check interpreterUserId user id is valid
		if(rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given userId cannot be found." });
			return;
		} else {
				console.log("user name: " + fullName);
				db.get().query('UPDATE user SET full_name = ? WHERE user_id = ?', [fullName, userId], function(err,res){
					if(err) {
						callback({ "success": false, "message": "something went wrong in the db." });
					}
					callback({ "success": true, "full_name": fullName });
					return;
				});
			}
	});

	console.log("Finished: setUserName");
}

module.exports = router;
