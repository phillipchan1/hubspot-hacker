var request = require('request');

// get region
var getRegionMap = function(callback) {
	var url = 'https://spreadsheets.google.com/feeds/list/1S_-x4lb9u1r4oPfoYnQNatKVc7uFIhp-PHmYyIca6x0/od6/public/basic';
	var qs = {
		alt: 'json'
	};

    request(
    	{
    		url: url,
    		qs:qs
    	},
    	function (error, response, body) {
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
	getRegion: getRegion,
	getRegionMap: getRegionMap
};