
// Module dependencies
var express = require('express');
var router = express.Router();

// Get database access
var db = require('../db');

// GET all convos and list them
router.get('/', function (req, res) {
	listConvos(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
});

// List all convos
function listConvos(callback) {
    console.log("listConvos Involed");
    var result;
    db.connect(db.MODE_DEVELOPMENT);
    db.get().query('SELECT * FROM convo', function(err,rows) {
        if (err) throw err;

        console.log("Preforming listConvos callback");
        callback(rows);
    });
}

module.exports = router;
