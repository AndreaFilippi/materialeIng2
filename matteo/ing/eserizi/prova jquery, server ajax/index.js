
var express = require ('express');
var bodyParser = require('body-parser');
var util = require('util');



var app = express();

var port = process.env.port || 8080;
//importantissimo il bodyparser per gestire le richieste POST!!!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'Options') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({});
    }

    res.write('sei in get');
    res.write('body: ' + util.inspect(req.query) + '\n');
    console.log(util.inspect(req.query));
    //res.write(util.inspect(req.query));

    res.end();
});

app.listen(port);