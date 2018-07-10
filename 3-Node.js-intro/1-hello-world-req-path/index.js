//Libraries
var http = require('http');
 
var hostname = '127.0.0.1';
var port = 8098;

//create a server
var server = http.createServer(
    function (req, res) {
        //HTML head (type of the page)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        
        //HTML content
        res.write('Hello World.\n');
        res.write('Requested URL : ' + req.url);
        res.end();
    }
);
 
//listen in a specific port
server.listen(port, hostname);
console.log('Server running at http://${hostname}:${port}/');