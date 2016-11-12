/**
 * SECTION: Module dependencies.
 */
var express = require('express')
  , routes = require('./routes');
var mysql = require("mysql"); //Requited for DB
var moment = require('moment'); //Required for Arg Parsing4
var path = require('path'); //Required for pathing to add extra files


/**
 * SECTION: Additional Files with functions dependencies
 */
require(path.resolve( __dirname, "./database.js" ))();
require(path.resolve( __dirname, "./convo_functions/listConvo.js" ))();
require(path.resolve( __dirname, "./convo_functions/endConvo.js" ))();
require(path.resolve( __dirname, "./convo_functions/updateConvoInterpreter.js" ))();
require(path.resolve( __dirname, "./convo_functions/updateConvoHOH.js" ))();
require(path.resolve( __dirname, "./convo_functions/createConvo.js" ))();
require(path.resolve( __dirname, "./user_functions/getUser.js" ))();



/**
 * SECTION: Configuration
 */
var app = module.exports = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/**
 * SECTION: Routes
 */
app.get('/listUser', function (req, res) {
  var userId = req.query.userId;
  // This line here is responsible for calling the next block of code
	getUser(userId, function(data) {
		res.setHeader('Content-Type', 'application/json');
  		res.json( data );
	});
})

app.get('/listConvo', function (req, res) {
	getAllConvos(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
})

app.get('/createConvo', function (req, res) {
	var hohUserId = req.query.hohUserId;
	var interpreterUserId = req.query.interpreterUserId;

	createConvo(hohUserId, interpreterUserId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
})

app.get('/pingConvoHOH', function (req, res) {
	var hohUserId = req.query.hohUserId;
	var ConvoId = req.query.ConvoId;

	updateConvoHOH(hohUserId, ConvoId, function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json( data );
	});
})

app.get('/pingConvoInterpreter', function (req, res) {
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


/**
 * SECTION: Start Server
 */
app.listen(80, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});