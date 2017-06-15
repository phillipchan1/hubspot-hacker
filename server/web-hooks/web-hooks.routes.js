var express = require('express');
var router = express.Router();
var regionConverter = require('../regionConverter/regionConverter');

router.post('/', function(req, res, callback) {
	var payload = req.body;
	var numOfPayloads = payload.length;
	var occurences = 0;

	// throttle number of api calls with custom loop
	if (payload) {
		var interval = setInterval(function() {
			if (occurences < numOfPayloads) {
				console.log(payload[occurences]);

				let event = payload[occurences].subscriptionType;

				if (event === 'contact.creation') {
					console.log('New Contact Created');
					regionConverter.addRegionToContact(payload[p].objectId);
				}

				// if a contact changes a specific property
				else if (event === 'contact.propertyChange') {
					console.log('Contact Property Change');
					regionConverter.addRegionToContact(payload[p].objectId);
				}

				occurences++;
			}
			else {
				clearInterval(interval);
			}
		}, 1000);
	}
});

module.exports = router;