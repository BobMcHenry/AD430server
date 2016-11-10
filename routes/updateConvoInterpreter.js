
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	var interpreterUserId = req.query.interpreterUserId;
	var ConvoId = req.query.ConvoId;

	updateConvoInterpreter(interpreterUserId, ConvoId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Update the last Interpreter user ping time for a convo with the given id
function updateConvoInterpreter(interpreterUserId, ConvoId, callback) {
	console.log("Invoked: updateConvoInterpreter");

	//Check your input is not null
	if(interpreterUserId == undefined) {
		callback({ "success": false, "message": "interpreterUserId was not supplied, but is required" });
		return;
	}
	if(ConvoId == undefined) {
		callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 1', interpreterUserId, function(err,rows){
		//Check interpreterUserId user id is valid
		if(rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given interpreterUserId cannot be found or is not a interpreter user." });
			return;
		} else {
			db.get().query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? AND interpreter_user_id = ?', [ConvoId, interpreterUserId] , function(err,rows){

				//Check interpreter user id is valid
				if(rows[0].isGood == 0) {
					callback({ "success": false, "message": "Given ConvoId cannot be found or did not belong to the given interpreter user." });
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

	console.log("Finished: updateConvoInterpreter");
}

module.exports = router;
