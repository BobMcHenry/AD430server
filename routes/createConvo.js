
// Module dependencies
var express = require('express');
var moment = require('moment');

// Get database access
var db = require('../db');

var router = express.Router();

// GET all convos and list them
router.get('/', function (req, res) {
	var hohUserId = req.query.hohUserId;
	var interpreterUserId = req.query.interpreterUserId;

	createConvo(hohUserId, interpreterUserId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Creates a new convo and checks the input is valid
function createConvo(hohUserId, interpreterUserId, callback) {
	console.log("createConvo Invoked");

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
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 0', hohUserId, function(err,rows){

		//Check Hoh user id is valid
		if(rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given hohUserId cannot be found or is not a hoh user." });
			return;
		} else {
			db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 1', interpreterUserId, function(err,rows){

				//Check interpreter user id is valid
				if(rows[0].isGood == 0) {
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
					db.get().query('INSERT INTO convo SET ?', convo, function(err,res) {
						console.log(err);
						console.log(res);
						callback({ "success": true, "convo_id": res.insertId });
						return;
					});
				}
			});
		}
	});
}

module.exports = router;
