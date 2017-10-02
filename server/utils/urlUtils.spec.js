var urlUtils = require('./urlUtils');
var should = require('chai').should();

describe('serializeQueryParameters()', function() {
	it('should make a query parameter list', function() {
		var exampleJSONparameters = {
			name: 'Phil',
			age: 99,
			email: 'email@gmail.com'
		};
		var expected = `?name=Phil&age=99&email=email%40gmail.com`;
		var actual = urlUtils.serializeQueryParameters(exampleJSONparameters);

		actual.should.equal(expected);
	});
});