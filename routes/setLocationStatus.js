// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var userId = req.query.userId;
	var status = req.query.status;

	setInterpreterStatus(userId, status, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Set the updated interpreter status of the user
function setInterpreterStatus(userId, status, callback) {
	console.log("Invoked: setLocationStatus");

	//Check your input is not null
	if(userId == undefined) {
		callback({ "success": false, "message": "userId was not supplied, but is required" });
		return;
	}
	if(status == undefined) {
		callback({ "success": false, "message": "status was not supplied, but is required" });
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
				console.log("status: " + status);
				db.get().query('UPDATE user SET ok_to_show_location = ? + 0 WHERE user_id = ?', [status, userId], function(err,res){
					if(err) {
						callback({ "success": false, "message": "something went wrong in the db." });
					}
					callback({ "success": true, "ok_to_show_location": status });
					return;
				});
			}
	});

	console.log("Finished: setLocationStatus");
}

module.exports = router;
