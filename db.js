Skip to content
This repository
Search
Pull requests
Issues
Gist
 @BobMcHenry
 Unwatch 5
  Star 1
 Fork 0 BobMcHenry/AD430server
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
Browse files
Added route: getSkypeName, fixed extra ; in db creation
 master
1 parent e9a0965 commit 9de82c4b7144371c166acc4695c10eb9e24262c9 @timdavish timdavish committed 20 minutes ago
Unified Split
Showing  6 changed files  with 61 additions and 36 deletions.
View
3  .gitignore
@@ -1,3 +1,4 @@
 +db.js
  node_modules/
  .DS_Store
 -access.log 
 +access.log
View
3  app.js
 @@ -23,6 +23,9 @@ app.use('/getPhysicalInterpreters', require('./routes/getPhysicalInterpreters'))
  app.use('/createUser', require('./routes/createUser'));
  app.use('/getUser', require('./routes/getUser'));
  app.use('/setUserName', require('./routes/setUserName'));
 +
 +
 +app.use('/getSkypeName', require('./routes/getSkypeName'));
  app.use('/setSkypeName', require('./routes/setSkypeName'));
  
  app.use('/getPassword', require('./routes/getPassword'));
View
33  db.js
@@ -1,33 +0,0 @@
 -
 -// Module dependencies
 -var mysql = require('mysql');
 -
 -// Databases
 -var PRODUCTION_DB = 'ad430_db',
 -    DEVELOPMENT_DB = 'ad430_db'; // can later be a test db
 -exports.MODE_PRODUCTION = 'mode_production';
 -exports.MODE_DEVELOPMENT = 'mode_development';
 -
 -var state = {
 -    pool: null,
 -    mode: null
 -};
 -
 -// Database connect function
 -exports.connect = function(mode) {
 -    state.pool = mysql.createPool({
 -        host: 'localhost',
 -        user: 'root',
 -        // password: 'root',
 -        password: 'root',
 -        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : DEVELOPMENT_DB,
 -		// socketPath: '/var/run/mysqld/mysqld.sock'
 -    });
 -
 -    state.mode = mode;
 -}
 -
 -// This function returns a database connection
 -exports.get = function() {
 -  return state.pool;
 -}
View
54  routes/getSkypeName.js
@@ -0,0 +1,54 @@
 +
 +// Module dependencies
 +var express = require('express');
 +
 +// Get database access
 +var db = require('../db');
 +
 +var router = express.Router();
 +
 +// Set up the route
 +router.get('/', function (req, res) {
 +    var userId = req.query.userId;
 +
 +	getSkypeName(userId, function(data) {
 +		res.setHeader('Content-Type', 'application/json');
 +		res.json(data);
 +	});
 +});
 +
 +// Get skype_username value for a user with the given userId
 +function getSkypeName(userId, callback) {
 +    console.log("Invoked: getSkypeName");
 +
 +	// Check your input is not null
 +	if (userId == undefined)
 +	{
 +		callback({ "success": false, "message": "userId was not supplied, but is required" });
 +		return;
 +	}
 +
 +	// Get and start SQL Connection
 +	db.connect(db.MODE_DEVELOPMENT);
 +
 +	// Check your input is valid with the DB
 +	db.get().query('SELECT COUNT(*) AS isGood FROM user WHERE user_id = ?', userId, function(err, rows) {
 +		// Check your userId is valid
 +		if (rows[0].isGood == 0) {
 +			callback({ "success": false, "message": "Given userId cannot be found." });
 +		} else {
 +            // Get skype_username
 +    		db.get().query('SELECT skype_username FROM user WHERE user_id = ?', userId, function(err, rows) {
 +                if (err) {
 +    				callback({ "success": false, "message": "something went wrong in the db." });
 +    			}
 +
 +    			callback(rows);
 +    		});
 +        }
 +	});
 +
 +    console.log("Finished: getSkypeName");
 +};
 +
 +module.exports = router;
View
2  routes/getUser.js
 @@ -22,7 +22,7 @@ function getUser(userId, callback) {
  	console.log("Invoked: getUser");
  
      // Check that input is not null
 -    if(userId == undefined) {
 +    if (userId == undefined) {
  		callback({ "success": false, "message": "userId not supplied, but required" });
  		return;
  	}
View
2  sql/ad_430db.sql
@@ -1,7 +1,7 @@
  DROP DATABASE IF EXISTS ad430_db;
  CREATE DATABASE ad430_db
  	DEFAULT CHARACTER SET utf8
 -  DEFAULT COLLATE utf8_general_ci;;
 +  DEFAULT COLLATE utf8_general_ci;
  use ad430_db;
  
  CREATE TABLE user
  Lock conversation
0 comments on commit 9de82c4
@BobMcHenry
  
            
 
Write  Preview

Leave a comment
Attach files by dragging & dropping,  Choose Files selecting them, or pasting from the clipboard.
 Styling with Markdown is supported
Comment on this commit
   Unsubscribe  You’re receiving notifications because you’re subscribed to this repository.
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help