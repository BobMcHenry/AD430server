
// Module dependencies
var express = require('express'),
    mysql = require('mysql'),
    moment = require('moment'); // Required for arg parsing

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
var listConvos = require('./routes/listConvos'),
    createConvo = require('./routes/createConvo'),
    updateConvoHOH = require('./routes/updateConvoHOH');
    // updateConvoInterpreter = require('./routes/updateConvoInterpreter'),
    // endConvo = require('./routes/endConvo');

app.use('/listConvos', listConvos);
app.use('/createConvo', createConvo);
app.use('/updateConvoHOH', updateConvoHOH);
// app.use('/updateConvoInterpreter', updateConvoInterpreter);
// app.use('/endConvo', endConvo);

app.get('/updateConvoInterpreter', function (req, res) {
	var interpreterUserId = req.query.interpreterUserId;
	var ConvoId = req.query.ConvoId;

	updateConvoInterpreter(interpreterUserId, ConvoId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
})

app.get('/endConvo', function (req, res) {
	var ConvoId = req.query.ConvoId;

	endConvo(ConvoId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
})

// Listen for requests
var port = 8081;
app.listen(port, function(){
  console.log("Express server listening on port " + port);
});







// Update the last ping time for an convo with the interpreter User
function updateConvoInterpreter(interpreterUserId, ConvoId, callback)
{
	//Check your input is not null
	if(interpreterUserId == undefined)
	{
		callback({ "success": false, "message": "interpreterUserId was not supplied, but is required" });
		return;
	}
	if(ConvoId == undefined)
	{
		callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
	var con = getConnection();
	con.connect();

	//Check your input is valid with the DB
	con.query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ? AND is_interpreter = 1', interpreterUserId, function(err,rows){
		//Check interpreterUserId user id is valid
		if(rows[0].isGood == 0)
		{
			con.end();
			callback({ "success": false, "message": "Given interpreterUserId cannot be found or is not a interpreter user." });
			return;
		} else {
			con.query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? AND interpreter_user_id = ?', [ConvoId, interpreterUserId] , function(err,rows){

				//Check interpreter user id is valid
				if(rows[0].isGood == 0)
				{
					con.end();
					callback({ "success": false, "message": "Given ConvoId cannot be found or did not belong to the given interpreter user." });
					return;
				} else {
					con.query('UPDATE convo SET last_updated_hoh = NOW() WHERE convo_id = ?', ConvoId, function(err,res){
						if(err) {
							callback({ "success": false, "message": "something went wrong in the db." });
						}
						console.log(err);
						console.log(res);
						callback({ "success": true, "convo_id": ConvoId });
						return;
					});
				}
			});
		}
	});
}

// Update the convo to be over according to the db
function endConvo(ConvoId, callback)
{
	if(ConvoId == undefined)
	{
		callback({ "success": false, "message": "ConvoId was not supplied, but is required" });
		return;
	}

	//Get and start SQL Connection
	var con = getConnection();
	con.connect();

	//Check your input is valid with the DB
	con.query('SELECT COUNT(*) AS isGood FROM convo WHERE convo_id = ? ', ConvoId , function(err,rows){

		//Check interpreter user id is valid
		if(rows[0].isGood == 0)
		{
			con.end();
			callback({ "success": false, "message": "Given ConvoId cannot be found." });
			return;
		} else {
			con.query('UPDATE convo SET end_time = NOW() WHERE convo_id = ?', ConvoId, function(err,res){
			if(err) {
				callback({ "success": false, "message": "something went wrong in the db." });
			}
				console.log(err);
				console.log(res);
				callback({ "success": true, "convo_id": ConvoId });
				return;
			});
		}
	});
}
