var express = require('express');
var router = express.Router();
var regionConverter = require('../regionConverter/regionConverter');

router.post('/', function(req, res, callback) {
	var payload = req.body;
	var numOfPayloads = payload.length;
	var occurences = 0;

	if (payload) {

		// throttle number of api calls with custom loop
		var interval = setInterval(function() {
			if (occurences < numOfPayloads) {
				console.log(payload[occurences]);

				let event = payload[occurences].subscriptionType;

				if (event === 'contact.creation') {
					console.log('New Contact Created');
					regionConverter.addRegionToContact(payload[occurences].objectId);
				}

				// if a contact changes a specific property
				else if (event === 'contact.propertyChange') {
					console.log('Contact Property Change');
					regionConverter.addRegionToContact(payload[occurences].objectId);
				}

				occurences++;
			}
			else {
				clearInterval(interval);
			}
		}, 2500);
	}
});

module.exports = router;