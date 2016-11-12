
// Module dependencies
var express = require('express'); // Required for arg parsing

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
// User related
app.use('/getUser', require('./routes/getUser'));
app.use('/getUserLocation', require('./routes/getUserLocation'));
app.use('/updateUserLocation', require('./routes/updateUserLocation'));

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
