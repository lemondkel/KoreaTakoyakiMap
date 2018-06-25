var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var placeDao = require('./dao/Place');

const Place = sequelize.define('Place', placeDao.info, placeDao.desc);

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

/* GET home page. */
router.get('/admin', function (req, res, next) {
	res.render('admin');
});

router.get('/places', function (req, res, next) {
	Place.findAll({
		attributes: ['idx', 'latitude', 'longitude', 'title', 'desc', [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('updatedAt'), '%Y-%m-%d %h:%i:%s'), 'updatedAt']]
	}).then(function (data) {
		res.status(200).json({data: data});
	});
});

router.post('/createPlace', function (req, res, next) {
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;
	var title = req.body.title;
	var desc = req.body.desc;

	Place.create({
		latitude: latitude,
		longitude: longitude,
		title: title,
		desc: desc
	}).then(function (data) {
		if (data !== null) {
			res.status(200).json('success!');
		} else {
			res.status(500).json('fail!');
		}
	});
});

module.exports = router;
