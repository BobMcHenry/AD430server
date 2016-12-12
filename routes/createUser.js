
// Module dependencies
var express = require('express');
var moment = require('moment');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var userEmail = req.query.userEmail;
	var isInterpreter = req.query.isInterpreter;
	var hashedPassword = req.query.hashedPassword;

	createUser(userEmail, isInterpreter, hashedPassword, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

/*Given input will be email, hash password and isIntrepreter and should return userid*/
function createUser(userEmail, isInterpreter, hashedPassword, callback) {

	// Check your input is not null
	if(userEmail == undefined) {
		callback({ "success": false, "message": "userEmail was not supplied, but is required" });
		return;
	}
	if(isInterpreter == undefined) {
		callback({ "success": false, "message": "isInterpreter was not supplied, but is required" });
		return;
	}

	if(hashedPassword == undefined) {
		callback({ "success": false, "message": "hashedPassword was not supplied, but is required" });
		return;
	}

	//Trim Extra Characters
	userEmail = userEmail.trim();
	userEmail = userEmail.toLowerCase();
	hashedPassword = hashedPassword.trim();

	if(userEmail.length > 250) {
		callback({ "success": false, "message": "userEmail must be 250 or less characters" });
		return;
	}

	if(hashedPassword.length > 250) {
		callback({ "success": false, "message": "hashedPassword must be 250 or less characters" });
		return;
	}

	if(isInterpreter != "1" && isInterpreter != "0") {
		callback({ "success": false, "message": "isInterpreter must be either a '0' or a '1'" });
		return;
	}


	// Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

	db.get().query('SELECT COUNT(*) AS isBad FROM user WHERE LOWER(email) = ?',userEmail.toLowerCase() ,function(err,rows){
		if (err) {
			console.log(err);
			callback({ "success": false, "message": "something went wrong in the db." });
			return;
		}
		//Check Hoh user id is valid
		if(rows[0].isBad == 1)
		{
			db.get().end();
			callback({ "success": false, "message": "Given email already exists." });
			return;
		} else {
			var user = {
				email: userEmail,
				is_interpreter: (isInterpreter == "1"),
				ok_to_chat: 0,
				ok_to_show_location: 0,
				hashed_password: hashedPassword
			};

			db.get().query('INSERT INTO user SET ?', user, function(err, res) {
				if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}
				db.get().end();
				callback({ "success": true, "user_id": res.insertId });
			});
		}

	});
	
}

module.exports = router;
