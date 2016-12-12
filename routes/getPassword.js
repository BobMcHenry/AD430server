// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var userEmail = req.query.userEmail;

	getPassword(userEmail, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

function getPassword(userEmail, callback) {
	//Check your input is not null
	if(userEmail == undefined)
	{
		callback({ "success": false, "message": "userEmail was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
    db.connect(db.MODE_DEVELOPMENT);
	userEmail = userEmail.trim();
	userEmail = userEmail.toLowerCase();

	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE LOWER(email) = ?',userEmail ,function(err,rows){
        if (err) {
            console.log(err);
            callback({ "success": false, "message": "something went wrong in the db." });
            return;
        }
		//Check Hoh user id is valid
		if(rows[0].isGood == 0)
		{
			db.get().end();
			callback({ "success": false, "message": "Given userEmail cannot be found." });
			return;
		} else {
			db.get().query('SELECT user_id, hashed_password, is_interpreter FROM user WHERE LOWER(email) = ?',userEmail ,function(err,rows){
                if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}
                
                // change is_interpreter from 0/1 to false/true
                rows[0].is_interpreter = (rows[0].is_interpreter) ? true : false;
				callback(rows[0]);
			});
		}
		db.get().end();
	});
}
module.exports = router;
