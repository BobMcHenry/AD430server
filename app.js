
// Module dependencies
var express = require('express'); // Required for arg parsing
var morgan = require('morgan'); // Logging middleware
var fs = require('fs'); // Filestream lib for logging

var app = express();

// create a write stream (in append mode) and set to logging middleware
// Logs will be in the style of apache access logs.
var accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'})
app.use(morgan('combined', {stream:accessLogStream}));


// Routes
// User related
app.use('/createUser', require('./routes/createUser'));
app.use('/getUser', require('./routes/getUser'));
app.use('/getUserLocation', require('./routes/getUserLocation'));
app.use('/updateUserLocation', require('./routes/updateUserLocation'));
app.use('/setInterpreterStatus', require('./routes/setInterpreterStatus'));
app.use('/getPassword', require('./routes/getPassword'));
app.use('/setPassword', require('./routes/setPassword'));
app.use('/setLocStatus', require('./routes/setLocStatus'));
app.use('/setSkypeName', require('./routes/setSkypeName'));
app.use('/updateUserLastActive', require('./routes/updateUserLastActive'));
app.use('/getVideoStatus', require('./routes/getVideoStatus'));
app.use('/getLocationStatus', require('./routes/getLocationStatus'));
app.use('/setLocationStatus', require('./routes/setLocationStatus'));
app.use('/setVideoStatus', require('./routes/setVideoStatus'));

// Bob - Works in progress
//app.use('/adminDashboard', require('./routes/adminDashboard'));
app.use('/getVideoInterpreters',require('./routes/getVideoInterpreters'));
app.use('/getPhysicalInterpreters',require('./routes/getPhysicalInterpreters'));

// Convo related
app.use('/getConvos', require('./routes/getConvos'));
app.use('/createConvo', require('./routes/createConvo'));
app.use('/endConvo', require('./routes/endConvo'));
app.use('/updateConvoHOH', require('./routes/updateConvoHOH'));
app.use('/updateConvoInterpreter', require('./routes/updateConvoInterpreter'));

// Listen for requests
var port = 8081;
app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

module.exports = app;
