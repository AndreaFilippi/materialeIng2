var http = require('http');
//Libraries
 
//create a server
var server = http.createServer(
    function (req, res) {
        //HTML head (type of the page)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        
        //HTML content
        res.end('Hello World 2');
    }
);
 
//listen in a specific port
server.listen(process.env.PORT || 80);
 
//check status
console.log('Server listening on port '+process.env.PORT);