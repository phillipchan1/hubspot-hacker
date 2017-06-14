var express = require('express');
var router = express.Router();
var regionConverter = require('../regionConverter/regionConverter');

router.post('/', function(req, res, callback) {
	var payload = req.body;

	console.log(payload);

	if (payload) {
		for (let p = 0; p < payload.length; p++) {
			let event = payload[p].subscriptionType;

			if (event === 'contact.creation') {
				console.log('New Contact Created');
				regionConverter.addRegionToContact(payload[p].objectId);
			}

			// if a contact changes a specific property
			else if (event === 'contact.propertyChange') {
				console.log('Contact Property Change');
				regionConverter.addRegionToContact(payload[p].objectId);
			}
		}
	}
});

module.exports = router;