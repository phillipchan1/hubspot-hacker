var regionConverter = require('../regionConverter/regionConverter');

var convertCountryToRegion = function(next) {

	// get country

	// look up dictionary
	regionConverter.getRegionDefinition(function(regionsMap) {
		// res.json(regionsMap);
		next(regionsMap);
	});

	// replace

	// feed it back

	// success message
};

module.exports = {
	convertCountryToRegion: convertCountryToRegion
};