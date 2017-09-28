var request = require('request');
var config = require('../../config/config');
var contactModel = require('../hubspot/contactModel');
var hubspot = require('../hubspot/hubspot');

// take a contact, give it a region based on contact's country
var addRegionToContact = function(userId, callback) {
	var success = false;
	var responseData = '';

	getRegionforContact(userId, function(region) {
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

				responseData = response.responseData;

				if (callback) {
					callback({
						success: success,
						responseData: responseData
					});
				}
			}
		);
	});
};

// returns json of contacts with correct regions
var getRegionForContacts = function(contactsList) {
	var updatedContactsList = [];
	console.log(contactsList);

	// iterate through list
	for (let i = 0; i < contactsList.length; i++) {
		let contact = contactsList[i];
		let country = '';

		try {
			if (contact.properties && contact.properties.country) {
				country = contact.properties.country.value;
			}
		}

		catch(e) {
			responseData = e;
			console.log(e);
		}

		let region = getRegion(country);
		let updatedContact = contactModel.newContact(
				contact.vid,
				[
					{
						"property": "newregion",
						"value": region
					}
				]
			);

		updatedContactsList.push(updatedContact);
	}

	return updatedContactsList;
};

var getRegionforContact = function(userId, callback) {
	hubspot.getContact(userId, function(response) {
		var country = '';
		var contact = response.responseData;

		if (contact.properties.country) {
			country = contact.properties.country.value;
		}

		var region = getRegion(country);

		if (callback) {
			callback(region);
		}
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
var getRegion = function(country) {
	var regionTable = global.regionMap.feed.entry;
	var countryData = {};
	var searchQuery = 'region: ';
	var region = '';

	for (let i = 0; i < regionTable.length; i++) {
		if (regionTable[i]["title"]["$t"] === country) {
			countryData = regionTable[i];

			let beginningCountryIndex = countryData.content.$t.indexOf(searchQuery);
			let endCountryIndex = countryData.content.$t.length;

			region = countryData.content.$t.substring(beginningCountryIndex + searchQuery.length, endCountryIndex);

			break;
		}
	}

	return region;
};

module.exports = {
	addRegionToContact: addRegionToContact,
	getRegionForContacts: getRegionForContacts,
	getRegion: getRegion,
	getRegionMap: getRegionMap
};