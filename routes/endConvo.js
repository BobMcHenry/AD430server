
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
    var ConvoId = req.query.ConvoId;

	endConvo(ConvoId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// End the convo with the given id by setting an end_time in the db
function endConvo(ConvoId, callback) {
    console.log("Invoked: endConvo");

	if(ConvoId == undefined) {
		callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
	db.connect(db.MODE_DEVELOPMENT);

	//Check your input is valid with the DB
	db.get().query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? ', ConvoId , function(err, rows){
        if (err) {
            console.log(err);
            callback({ "success": false, "message": "something went wrong in the db." });
            return;
        }
		//Check interpreter user id is valid
		if(rows[0].isGood == 0) {
			callback({ "success": false, "message": "Given ConvoId cannot be found." });
			return;
		} else {
			db.get().query('UPDATE convo SET end_time = NOW() WHERE convo_id = ?', ConvoId, function(err, res){
                if (err) {
					console.log(err);
					callback({ "success": false, "message": "something went wrong in the db." });
					return;
				}

				callback({ "success": true, "convo_id": ConvoId });
			});
		}
	});
	db.get().end();
    console.log("Finished: endConvo");
}

module.exports = router;
