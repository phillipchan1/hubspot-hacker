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

describe('isJSON', function () {

	it('should return true if it is an empty JSON object', function () {
		var sampleObject = [{}];
		var expected = true;
		var actual = listUtils.isJSON(sampleObject);

		expected.should.equal(actual);
	});

	it('should return true if it is a populated JSON object', function () {
		var sampleObject = [{
			name: 'phil',
			age: 99
		}];

		var expected = true;
		var actual = listUtils.isJSON(sampleObject);

		expected.should.equal(actual);
	});

	it('should return false if it is a string', function () {
		var sampleObject = 'name is Phil';
		var expected = false;
		var actual = listUtils.isJSON(sampleObject);

		expected.should.equal(actual);
	});

	it('should return true if it is an array', function () {
		var sampleObject = [];
		var expected = true;
		var actual = listUtils.isJSON(sampleObject);

		expected.should.equal(actual);
	});

	it('should return true if it is an object', function () {
		var sampleObject = {};
		var expected = true;
		var actual = listUtils.isJSON(sampleObject);

		expected.should.equal(actual);
	});
});