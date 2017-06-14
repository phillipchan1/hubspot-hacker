'use strict';

var express = require('express');
var router = express.Router();

var contacts = require('./contacts');

router.post('/', function(req, res, callback) {
	var objectId = req.body[0].objectId;
	var payload = req.body;

	if (objectId) {

		// if a new contact is created
		if (payload.subscriptionType === 'contact.creation') {
			console.log('New Contact Created');
			contacts.addRegionToContact(objectId);
		}

		else if (payload.subscriptionType === 'contact.propertyChange') {
			console.log('New Contact Created');
			contacts.addRegionToContact(objectId);
		}
	}
});

module.exports = router;