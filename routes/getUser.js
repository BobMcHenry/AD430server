
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// GET all convos and list them
router.get('/', function (req, res) {
    var userId = req.query.userId;

	getUser(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

function getUser(userId, callback) {
	console.log("Invoked: getUser");

	var result;
    db.connect(db.MODE_DEVELOPMENT);
	db.get().query('SELECT * FROM user WHERE user_id = ?', userId, function(err,rows) {
        if (err) throw err;

		callback(rows);
	});

    console.log("Finished: getUser");
}

module.exports = router;
