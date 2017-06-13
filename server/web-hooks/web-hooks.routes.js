'use strict';

var express = require('express');
var router = express.Router();

var hubspot = require('../hubspot/hubspot');
var regionConverter = require('../regionConverter/regionConverter');

router.post('/new-contact', function(req, res, callback) {
	console.log('New Contact Created');
	console.log(req.body[0]);
	var userId = req.body[0].objectId;
	console.log(`userId: ${userId}`);

	if (userId) {
		hubspot.getContactCountry(userId, function(country) {

		require('./regionConverter/regionConverter').getRegion(country, function(region) {

			hubspot.updateContact(
				userId,
				{
					"properties": [
						{
							"property": "newregion",
							"value": region
						}
					]
				},
				function(contact) {
					console.log(`User ${userId} Updated`);

				}
			);
		});
	});
	}



	// hubspot.getContact(req.body.objectId, function(contact) {
	// 	console.log(contact);
	// });

	// give it a country, get the region
	regionConverter.getRegion('United States', function(region) {
		res.json(region);
	});
});

module.exports = router;