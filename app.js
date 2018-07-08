var express = require('express');
var app = express();
var questionController = require('./controllers/questionController');
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.send("Running...");
});
questionController(app);
app.listen(port, server_ip_address);