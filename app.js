
// Module dependencies
var express = require('express'); // Required for arg parsing

var app = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
var getUser = require('./routes/getUser'),
    getConvos = require('./routes/getConvos'),
    createConvo = require('./routes/createConvo'),
    updateConvoHOH = require('./routes/updateConvoHOH');
    updateConvoInterpreter = require('./routes/updateConvoInterpreter'),
    endConvo = require('./routes/endConvo');

app.use('/getUser', getUser);
app.use('/getConvos', getConvos);
app.use('/createConvo', createConvo);
app.use('/updateConvoHOH', updateConvoHOH);
app.use('/updateConvoInterpreter', updateConvoInterpreter);
app.use('/endConvo', endConvo);

// Listen for requests
var port = 8081;
app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

module.exports = app;
