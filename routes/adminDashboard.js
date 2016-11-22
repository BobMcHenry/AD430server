
// Module dependencies
var express = require('express');
var moment = require('moment');

// Get database access
var db = require('../db');

var router = express.Router();

// Set up the route
router.get('/', function (req, res) {
	adminDashboard( function(data) {
		res.setHeader('Content-Type', 'text/html');
		res.send(data);
	});
});

function adminDashboard(callback){
    console.log('Dashboard');
    // Connect to the database
    db.connect(db.MODE_DEVELOPMENT);
    var userQuery;
    // # get user data
    userQuery = `SELECT full_name, email, skype_username, last_known_location_lat, last_known_location_long, last_active_time, is_interpreter=1 AS is_interpreter, ok_to_chat=1 AS ok_to_chat, ok_to_show_location=1 AS ok_to_show_location FROM user `;

    db.get().query(userQuery, function(err, rows) {
        if (err) {
            console.log(err);
            callback({ 'success': false, 'message': 'something went wrong in the db.' });
        }
		var output = '<table>' + makeTableColumnsFromKeys(rows[0]);
		for (var i = 0; i < rows.length; i++){
		    output += '\n<tr>'
			//console.log(rows[i].length);
		    for (var key in rows[i]){
		        output += '<td>' + (rows[i][key]) + '</td>';
		    }
            output += '</tr>\n';
		}
		output += '</table>';
		//console.log(output);
		callback(output);
	});
};

module.exports = router;

function makeTableColumnsFromKeys(dataset){
    var keys = Object.keys(dataset);
    var tableHeader = '<tr>';
    for (var i = 0; i < keys.length; i++){
	tableHeader += '<th>' + keys[i] + '</th>';
    }
    tableHeader += '</tr>';
    return tableHeader;
};
