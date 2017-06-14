'use strict';

var express = require('express');
var router = express.Router();

var contacts = require('./contacts');

router.post('/', function(req, res, callback) {
	// var objectId = req.body[0].objectId;
	var payload = req.body[0];

	console.log(payload);

	if (payload) {

		// if a new contact is created
		if (payload.subscriptionType === 'contact.creation') {
			console.log('New Contact Created');
			contacts.addRegionToContact(payload.objectId);
		}

		else if (payload.subscriptionType === 'contact.propertyChange') {
			console.log('Contact Property Change');
			contacts.addRegionToContact(payload.objectId);
		}
	}
});

module.exports = router;