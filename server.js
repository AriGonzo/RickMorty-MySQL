//Dependencies-----------------------------------------------------
var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var PORT = 8080;
//-----------------------------------------------------------------


//Middleware-------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
//-----------------------------------------------------------------


//DB Connection----------------------------------------------------
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.argv[2],
	database: 'favoriteShow_db'
});

connection.connect(function(err){
	if (err) {
		console.error('error connection:', err.stack);
		return
	}
	console.log('connected!')
});
//-----------------------------------------------------------------


//Routing----------------------------------------------------------
app.use(express.static('public'));
require('./routing/api-routing.js')(app, connection);
//-----------------------------------------------------------------


//Turning on Server------------------------------------------------
app.listen(PORT, function(){
	console.log("listening on", PORT)
});
//-----------------------------------------------------------------