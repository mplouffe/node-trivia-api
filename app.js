var express = require('express');
var app = express();
var questionController = require('./controllers/questionController');
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function(req, res){
  res.send("Running...");
});
questionController(app);
app.listen(port, server_ip_address);