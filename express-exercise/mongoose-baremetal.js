var mongoose = require('mongoose');

var mongoConnection = mongoose.connect('mongodb://localhost/db_name');

var personSchema = new mongoose.Schema({
    name: String
});

// third param targets collection
var Person = mongoose.model('Person', personSchema, 'users');

Person.find({},function(err, persons){
    if(err) return console.error(err);
    console.log(persons);
});