var express     = require('express');
var app         = express();
var controller = require('../controller/chat_controller');

var appRouter = express.Router();

appRouter.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:3000/api');
});

appRouter.get('/rooms', controller.getAllRooms);
appRouter.post('/user', controller.createUser);

//Route per l'autenticazione, ad esempio una form di login
appRouter.post('/authenticate', controller.authentication);

appRouter.use(controller.middleware); 
//Il middleware permette di dividere i due tipi di richiesta. 
//Intercetta tutte le richieste e se il Token non c'è o è sbagliato risponde con un errore e non lascia proseguire con le richieste sotto

appRouter.get('/users', controller.getAllUsers);
appRouter.get('/user/:userid', controller.getUser);
appRouter.get('/msg', controller.getMessage);

appRouter.post('/msg', controller.createMessage);
appRouter.post('/room', controller.createRoom);

appRouter.put('/user/:userid', controller.updateUser);
appRouter.put('/room/:roomid', controller.updateRoom);




module.exports = appRouter;