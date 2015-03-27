var express = require('express');
var googleImages = require('../lib/image-downloader');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS challenge' });
});

/* GET home page. */
router.get('/:keyword/:num?', function(req, res, next) {
	googleImages.clearResults();
	console.log("Getting " + req.params.keyword);
	googleImages.init(req.params.keyword, req.params.num, function (err, data) {
		res.render('index', { title: 'Results', data: googleImages.getResults() });
	});

});

/* GET home page. */
router.get('/:keyword/:num?/json', function(req, res, next) {
	googleImages.clearResults();
	console.log("Getting " + req.params.keyword);
	googleImages.init(req.params.keyword, req.params.num, function (err, data) {
		res.json(googleImages.getResults());
	});

});

module.exports = router;
