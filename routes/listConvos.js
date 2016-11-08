
// Module dependencies
var express = require('express');

// Get database access
var db = require('../db');

var router = express.Router();

// GET all convos and list them
router.get('/', function (req, res) {
	listConvos(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// List all convos
function listConvos(callback) {
    console.log("listConvos Invoked");
    var result;
    db.connect(db.MODE_DEVELOPMENT);
    db.get().query('SELECT * FROM convo', function(err,rows) {
        if (err) throw err;

        callback(rows);
    });
}

module.exports = router;
