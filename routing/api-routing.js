module.exports = function(app, db, mysql){
	app.get('/', function(){
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
	});

	app.get('/cast', function(req, res){
		db.query('SELECT * FROM actors', function(err, result){
			if (err) { throw err }
			res.json(result);
		});
	});

	app.get('/coolness-chart/asc', function(req, res){
		db.query('SELECT * FROM actors ORDER BY coolness_points ASC', function(err, result){
			if (err) { throw err }
			res.json(result);
		});
	});

		app.get('/coolness-chart/desc', function(req, res){
		db.query('SELECT * FROM actors ORDER BY coolness_points DESC', function(err, result){
			if (err) { throw err }
			res.json(result);
		});
	});

	app.get('/attitude-chart/:att', function(req, res){
		db.query('SELECT * FROM actors WHERE ?', {attitude: req.params.att}, function(err, result){
			if (err) { throw err }
			res.json(result[0]);
		});
	});

	app.get('/characters/:id', function(req, res){
		db.query('SELECT * FROM actors WHERE ?', {id: req.params.id}, function(err, result){
			if (err) { throw err }
			res.json(result[0]);
		});
	});

	app.get('/attitudes', function(req, res){
		db.query('SELECT attitude FROM actors ORDER BY attitude ASC', function(err, results){
			res.json(results)
		});
	});

	app.post('/newCharacter', function(req, res){
		db.query('INSERT INTO actors SET ?', req.body, function(){
			res.sendStatus(200);
		});
	});
}