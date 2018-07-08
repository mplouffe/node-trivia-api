var express = require('express');
var app = express();
var questionController = require('./controllers/questionController');
var port = process.env.PORT || 3000;
questionController(app);
app.listen(port);