'use strict';

var express = require('express');
var router = express.Router();
var regionConverter = require('../regionConverter/regionConverter');

router.post('/', function(req, res, callback) {
	var payload = req.body[0];
	var hubspotEvent = payload.subscriptionType;

	console.log(payload);

	if (payload) {

		// if a new contact is created
		if (hubspotEvent === 'contact.creation') {
			console.log('New Contact Created');
			regionConverter.addRegionToContact(payload.objectId);
		}

		// if a contact changes a specific property
		else if (hubspotEvent === 'contact.propertyChange') {
			console.log('Contact Property Change');
			regionConverter.addRegionToContact(payload.objectId);
		}
	}
});

module.exports = router;