var request = require('request');
var config = require('../../config/config');
var hubspot = require('../hubspot/hubspot');

// take a contact, give it a region based on contact's country
var addRegionToContact = function(userId, callback) {
	var success = false;
	var data = '';

	// get hubspot user
	hubspot.getContact(userId, function(response) {
		var country = '';
		var contact = response.data;

		try {
			country = contact.properties.country.value;
		}

		catch(e) {
			console.log(e);
		}

		// get region based on country
		getRegion(country, function(region) {

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
				function(response) {
					if (response.success === true) {
						console.log(`User ${userId} Successfully Updated`);
						success = true;
					}

					data = response.data;

					if (callback) {
						callback({
							success: success,
							data: data
						});
					}
				}
			);
		});
	});
};

// get country/region dictionary
var getRegionMap = function(callback) {
	request.get(
	{
		url: config.regionMapUrl + '?alt=json',
		timeout: 60000
	},
	function(err, response, body) {
		if (err) {
			console.log(err);
		}
		callback(JSON.parse(body));
	}
	);
};

// get region based on country
var getRegion = function(country, callback) {
	getRegionMap(function(regionMap) {
		var regionTable = regionMap.feed.entry;
		var countryData = {};
		var searchQuery = 'region: ';
		var region = '';

		for (let i = 0; i < regionTable.length; i++) {
			if (regionTable[i]["title"]["$t"] === country) {
				countryData = regionTable[i];

				let beginningCountryIndex = countryData.content.$t.indexOf(searchQuery);
				let endCountryIndex = countryData.content.$t.indexOf(',', beginningCountryIndex);

				var region = countryData.content.$t.substring(beginningCountryIndex + searchQuery.length, endCountryIndex);

				break;
			}
		}

		if (callback) {
			callback(region);
		}
	});
};

module.exports = {
	addRegionToContact: addRegionToContact,
	getRegion: getRegion
};