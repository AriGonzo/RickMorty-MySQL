var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var PORT = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

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

app.use(express.static('public'));

app.get('/', function(){
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cast', function(req, res){
	connection.query('SELECT * FROM actors', function(err, result){
		if (err) { throw err }
		res.json(result);
	});
});

app.get('/coolness-chart/:order', function(req, res){
	connection.query('SELECT * FROM actors ORDER BY coolness_points ' + req.params.order.toUpperCase(), function(err, result){
		if (err) { throw err }
		res.json(result);
	});
});

app.get('/attitude-chart/:att', function(req, res){
	connection.query('SELECT * FROM actors WHERE ?', {attitude: req.params.att}, function(err, result){
		if (err) { throw err }
		res.json(result[0]);
	});
});

app.get('/characters/:id', function(req, res){
	connection.query('SELECT * FROM actors WHERE ?', {id: req.params.id}, function(err, result){
		if (err) { throw err }
		res.json(result[0]);
	});
});

app.get('/attitudes', function(req, res){
	connection.query('SELECT attitude FROM actors ORDER BY attitude ASC', function(err, results){
		res.json(results)
	});
});

app.post('/newCharacter', function(req, res){
	connection.query('INSERT INTO actors SET ?', req.body, function(){
		res.sendStatus(200);
	});
});

app.listen(PORT, function(){
	console.log("listening on", PORT)
});