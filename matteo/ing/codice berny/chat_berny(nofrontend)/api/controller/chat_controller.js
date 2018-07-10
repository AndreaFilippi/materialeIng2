var mongoose = require('mongoose');
var User   = require('../model/user');
var Room   = require('../model/room');
var Message   = require('../model/message');
var jwt    = require('jsonwebtoken');
var config = require('../../config');

exports.authentication = function(req, res) {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
  
      if (err) throw err;
  
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
  
        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
        const payload = {
            password: user.password
        };
          var token = jwt.sign(payload, config.secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });
  
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }   
  
      }
  
    });
}

exports.middleware = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
}

exports.createUser = function(req, res){
    var new_user = new User(req.body);
    console.log(req.body); //DEBUG
    new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
    });
}

exports.createRoom = function(req, res){
    var new_room = new Room(req.body);
    console.log(req.body); //DEBUG
    new_room.save(function(err, room) {
        if (err)
          res.send(err);
        res.json(room);
    });
}

exports.createMessage = function(req, res){
    //Non serve controllare l'utente perchè se si arriva qua significa che già c'è il token per accedere a questa zona
    //Controlliamo invece se esiste la stanza

    Room.findOne({
        name: req.body.room
      }, function(err, room) {
    
        if (err) throw err;
    
        if (!room) {
          res.json({ success: false, message: 'Stanza non trovata. Prova con un altra stanza!' });
        } else if (room) {
            var new_message = new Message(req.body);
            console.log(req.body); 
            new_message.save(function(err, message){
                if (err)
                    res.send(err);
                res.json(message);
            });
        }
    });
}

exports.updateUser = function(req, res){
    User.findOneAndUpdate({_id: req.params.userid}, req.body, {new: true}, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
    });
}

exports.updateRoom = function(req, res){
    Room.findOneAndUpdate({_id: req.params.roomid}, req.body, {new: true}, function(err, room) {
        if (err)
          res.send(err);
        res.json(room);
    });
}

exports.getUser = function(req, res){
    let userid = req.params.userid;
    User.findById(userid, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
    });
}

exports.getMessage = function(req, res){
    let room = req.query.room;
    let date = req.query.date;
    Message.find({"room": room, "date": date}, function(err, msg) {
        if (err)
          res.send(err);
        res.json(msg);
    });
}

exports.getAllUsers = function(req, res){
    User.find({}, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
    });
}

exports.getAllRooms = function(req, res){
    Room.find({}, function(err, room) {
        if (err)
          res.send(err);
        res.json(room);
    });
}