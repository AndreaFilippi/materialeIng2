var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');

var routes = require('./api/routes/routes');
var config = require('./config');
var mongoose = require('mongoose');
var User   = require('./api/model/user');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient: true}); // connect to database

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port);
console.log('Chat working on: ' + port);