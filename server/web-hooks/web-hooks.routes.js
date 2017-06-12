'use strict';

var express = require('express');
var router = express.Router();

var contacts = require('../contacts/contacts');
var regionConverter = require('../regionConverter/regionConverter');

router.get('/new-contact', function(req, res, callback) {
	// regionConverter.getRegionMap(function(map) {
	// 	res.json(map);
	// });

	// give it a country, get the region
	regionConverter.getRegion('United States', function(region) {
		res.json(region);
	});
});

module.exports = router;