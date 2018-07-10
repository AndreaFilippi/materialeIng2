const express = require ('express');
var bodyParser = require('body-parser')
const astro = require ('./astro.js');

var app = express();
app.use(bodyParser.json());

var port = (port = process.env.PORT || 5000);

app.use(function(req,resp,next){
    //Enabling CORS
    resp.header('Access-Control-Allow-Origin', '*');
    //Support header x-access-token for the authentication token
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    resp.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        resp.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return resp.status(200).json({});
    }
    // make sure we go to the next routes
    next();
});

app.get('/',function(req,resp){
    resp.write('il server è in funzione, la api risponde all indirizzo /astro/');
    resp.end();
})

app.use('/astro',astro);

app.listen(port, function(){
    console.log('server in funzione');
});

