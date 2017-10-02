var listUtils = require('./listUtils');
var should = require('chai').should();

describe('isNotEmpty()', function() {
	it('should tell me if a list is empty', function() {
		var list = ['no'];
		var expected = true;
		var actual = listUtils.isNotEmpty(list);

		expected.should.equal(actual);
	});

	it('should tell me if a list is empty', function() {
		var list = ['no', 'yes', 123];
		var expected = true;
		var actual = listUtils.isNotEmpty(list);

		expected.should.equal(actual);
	});

	it('should tell me if a list is empty', function() {
		var list = [];
		var expected = false;
		var actual = listUtils.isNotEmpty(list);

		expected.should.equal(actual);
	});

});