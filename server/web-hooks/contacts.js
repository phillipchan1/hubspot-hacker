var hubspot = require('../hubspot/hubspot');
var regionConverter = require('../regionConverter/regionConverter');

var addRegionToContact = function(userId) {

	// get hubspot user
	hubspot.getContact(userId, function(contact) {
		var country = contact.properties.country.value;

		if (country) {
			// get region based on country
			regionConverter.getRegion(country, function(region) {

				// then update contact with region
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
		}
	});
};

module.exports = {
	addRegionToContact: addRegionToContact
};