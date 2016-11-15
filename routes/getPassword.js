// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;

	getPassword(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

function getPassword(userId, callback) {
	//Check your input is not null
	if(userId == undefined)
	{
		callback({ "success": false, "message": "userId was not supplied, but is required" });
		return;
	}
	
	//Get and start SQL Connection
    db.connect(db.MODE_DEVELOPMENT);
	
	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ?',userId ,function(err,rows){
	
		//Check Hoh user id is valid
		if(rows[0].isGood == 0)
		{
			db.get().end();
			callback({ "success": false, "message": "Given userId cannot be found." });
			return;
		} else {
			db.get().query('SELECT hashed_password FROM user WHERE user_id = ?',userId ,function(err,rows){
				if (err) throw err;

				db.get().end();
				callback(rows[0].hashed_password);
			});
		}
	});
}
module.exports = router;