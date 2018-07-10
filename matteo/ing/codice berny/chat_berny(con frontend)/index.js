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

app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  //Support header x-access-token for the authentication token
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Content-Type', 'application/json');
  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      return res.status(200).json({});
  }
  // make sure we go to the next routes
  next();
});

app.use('/', routes);

app.listen(port);
console.log('Chat working on: ' + port);