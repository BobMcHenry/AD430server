
// Module dependencies
var express = require('express');
var moment = require('moment');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var hohUserId = req.query.hohUserId;
	var ConvoId = req.query.ConvoId;

	updateConvoHOH(hohUserId, ConvoId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Update the last HOH user ping time for a convo with the given id
function updateConvoHOH(hohUserId, ConvoId, callback) {
    console.log("Invoked: updateConvoHOH");

	//Check your input is not null
	if(hohUserId == undefined) {
		callback({ "success": false, "message": "hohUserId was not supplied, but is required" });
		return;
	}
	if(ConvoId == undefined) {
		callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 0', hohUserId, function(err,rows){
		//Check Hoh user id is valid
		if(rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given hohUserId cannot be found or is not a hoh user." });
			return;
		} else {
			db.get().query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? AND hoh_user_id = ?', [ConvoId, hohUserId] , function(err,rows){

				//Check interpreter user id is valid
				if(rows[0].isGood == 0) {
					callback({ "success": false, "message": "Given ConvoId cannot be found or did not belong to the given HOH user." });
					return;
				} else {
					db.get().query('UPDATE convo SET last_updated_hoh = NOW() WHERE convo_id = ?', ConvoId, function(err,res){
						if(err) {
							callback({ "success": false, "message": "something went wrong in the db." });
						}
						callback({ "success": true, "convo_id": ConvoId });
						return;
					});
				}
			});
		}
	});

    console.log("Finished: updateConvoHOH");
}

module.exports = router;
