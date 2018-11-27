// modules
var express = require('express');  
var app = express();

// set our port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// set the static files location 
app.use(express.static(__dirname + '/public'));

require('./NodeApp/routes')(app); // configure our routes

// startup our app at http://localhost:3000
app.listen(port);

console.log('server running on http://localhost:' + port);

// expose app
exports = module.exports = app;