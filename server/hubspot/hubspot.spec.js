var hubspot = require('./hubspot');
var should = require('chai').should();

describe('isPayLoadEmpty', function () {

	it('should return true if an empty object is there', function () {
		var testPayload = {};

		var expected = true;
		var actual = hubspot.isPayloadEmpty(testPayload);

		expected.should.equal(actual);
	});

	it('should return false if there is an objectId in there', function () {
		var testPayload = {
			objectId: 12321
		};

		var expected = false;
		var actual = hubspot.isPayloadEmpty(testPayload);


		expected.should.equal(actual);
	});
});

describe('filterPayload()', function () {
	it('should ignore fully populated payloads', function () {
		var testPayload = [
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				objectId: 2222,
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			}
		];

		var expected = [
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				objectId: 2222,
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			}
		];

		var actual = hubspot.filterPayload(testPayload);

		expected.should.deep.equal(actual);
	});

	it('should remove empty payload objects and leave others intact', function () {
		var testPayload = [
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			}
		];

		var expected = [
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			}
		];

		var actual = hubspot.filterPayload(testPayload);

		expected.should.deep.equal(actual);
	});

	it('should remove empty payload objects and leave others intact', function () {
		var testPayload = [
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			},
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			}
		];

		var expected = [
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			},
			{
				objectId: 1111,
				name: 'Phil'
			},
			{
				objectId: 3333,
				name: 'Phil'
			}
		];

		var actual = hubspot.filterPayload(testPayload);

		expected.should.deep.equal(actual);
	});
});