var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/download', function(req, res, next) {
	console.log(__dirname);
	fs.writeFile('./public/layout.xml', req.query.file_string, function(err) {
		if(err) {
			console.log(err);
		}
		res.send("LAYOUT.XML WRITTEN");
	});
});

module.exports = router;
