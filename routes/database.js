 
const express = require('express');
const router = express.Router();
const evolutionController = require('../controllers/evolution');

var mongoose = require('mongoose')
, Admin = mongoose.mongo.Admin;
var ALL_DATABASE_URL='mongodb+srv://Manh-Hoang:123456A@cluster0-gkgpa.gcp.mongodb.net/database';
/// create a connection to the DB    
var connection = mongoose.createConnection( ALL_DATABASE_URL,{ useNewUrlParser: true });
connection.on('open', function() {
// connection established
new Admin(connection.db).listDatabases(function(err, result) {
    console.log('listDatabases succeeded');
    // database list stored in result.databases
    var allDatabases = result.databases;    
    console.log(allDatabases)
});
});

//GET 
//router.get('/',);

//module.exports= router;