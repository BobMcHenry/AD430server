
// Module dependencies
var express = require('express');
var moment = require('moment');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var hohUserId = req.query.hohUserId;
	var interpreterUserId = req.query.interpreterUserId;

	createConvo(hohUserId, interpreterUserId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Creates a new convo using the given ids after checking the input is valid
function createConvo(hohUserId, interpreterUserId, callback) {
	console.log("Invoked: createConvo");

	// Check your input is not null
	if(hohUserId == undefined) {
		callback({ "success": false, "message": "hohUserId was not supplied, but is required" });
		return;
	}
	if(interpreterUserId == undefined) {
		callback({ "success": false, "message": "interpreterUserId was not supplied, but is required" });
		return;
	}

	// Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 0', hohUserId, function(err, rows){
		if (err) {
			console.log(err);
			callback({ "success": false, "message": "something went wrong in the db." });
			return;
		}
		//Check Hoh user id is valid
		if(rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given hohUserId cannot be found or is not a hoh user." });
			return;
		} else {
			db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 1', interpreterUserId, function(err, rows){
				if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}
				//Check interpreter user id is valid
				if (rows[0].isGood == 0) {
					callback({ "success": false, "message": "Given interpreterUserId cannot be found or is not a interpreter user." });
					return;
				} else {
					//Insert in the new convo
					var convo = {
    						start_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    						hoh_user_id: hohUserId,
    						interpreter_user_id: interpreterUserId,
    						last_updated_hoh: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    						last_updated_interpreter: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
						};
					db.get().query('INSERT INTO convo SET ?', convo, function(err, res) {
						if (err) {
							console.log(err);
							callback({ "success": false, "message": "something went wrong in the db." });
							return;
						}

						callback({ "success": true, "convo_id": res.insertId });
					});
				}
			});
		}
	});
	db.end();
	console.log("Finished: createConvo");
}

module.exports = router;
