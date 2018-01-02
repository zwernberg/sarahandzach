var express = require("express");
var app = express();
var path    = require("path");
app.set('port', 3000);
app.use(express.static(path.join(__dirname, '/')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
});

console.log("Running at Port 3000");