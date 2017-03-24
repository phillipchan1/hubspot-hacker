var contacts = require('./contacts');
var should = require('chai').should();

describe('contacts', function() {
	it('should equal ', function() {
		contacts.add(2, 2).should.equal(4);
	});
});