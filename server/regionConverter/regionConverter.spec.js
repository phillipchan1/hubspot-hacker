var regionConverter = require('./regionConverter');
var should = require('chai').should();

before(function(done) {
	regionConverter.getRegionMap(function(map) {
		global.regionMap = map;
		done();
	});
});

describe('regionConverter', function() {

	it('should return the region for a country', function() {
		var expected = 'CEE';
		var actual = regionConverter.getRegion("Estonia");

		expected.should.equal(actual);
	});

	it('should return the region for a country', function() {
		var expected = 'Latin America';
		var actual = regionConverter.getRegion("Uruguay");

		expected.should.equal(actual);
	});

	it(`should return empty string if country doesn't exist`, function() {
		var expected = '';
		var actual = regionConverter.getRegion('randomCountry');

		expected.should.equal(actual);
	});
});