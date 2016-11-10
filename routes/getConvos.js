
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	getConvos(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// Get and list all convos
function getConvos(callback) {
    console.log("Invoked: getConvos");

    var result;
    db.connect(db.MODE_DEVELOPMENT);
    db.get().query('SELECT * FROM convo', function(err,rows) {
        if (err) throw err;

        callback(rows);
    });

	console.log("Finished: getConvos");
}

module.exports = router;
