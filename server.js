// modules
var express = require('express');  
var app = express();

// set our port
var port = process.env.PORT || 3000;

// set the static files location 
app.use(express.static(__dirname + '/public'));

require('./NodeApp/routes')(app); // configure our routes

// startup our app at http://localhost:3000
app.listen(port);

console.log('server running on http://localhost:3000');

// expose app
exports = module.exports = app;