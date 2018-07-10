var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Message', new Schema({ 
    testo: String, 
    room: String,
    utente: String,
    date: {type: Date, default: new Date()}
}));