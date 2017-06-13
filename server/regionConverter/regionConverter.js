var request = require('request');
var config = require('../../config/config');

// get region
var getRegionMap = function(callback) {
    request.get(
    	{
    		url: config.regionMapUrl + '?alt=json',
			timeout: 60000
    	},
    	function (err, response, body) {
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

		if (region) {
			callback(region);
		} else {
			console.error('No Region Found for Country');
		}

	});
};

module.exports = {
	getRegion: getRegion
};