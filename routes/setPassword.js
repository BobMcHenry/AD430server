// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userId = req.query.userId;
	var newPassword = req.query.newPassword;

	setPassword(userId, newPassword, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});



function setPassword(userId, newPassword, callback) {
	//Check your input is not null
	if(userId == undefined)
	{
		callback({ "success": false, "message": "userId was not supplied, but is required" });
		return;
	}
		
	if(newPassword == undefined)
	{
		callback({ "success": false, "message": "newPassword was not supplied, but is required" });
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
			db.get().query('UPDATE user SET hashed_password = ? WHERE user_id = ?', [newPassword,userId], function(err,res){
				if(err) {
					callback({ "success": false, "message": "something went wrong in the db." });
				}
				console.log(err);
				console.log(res);
				callback({ "success": true, "user_id": userId });
				return;
			});
		}
	});
};


module.exports = router;