var request = require('request');
var tokens = require('../oauth/tokens.json');

var getContact = function(id, callback) {
	request.get(
		{
			url: `https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`
			}
		},
		function(err, response) {
			if (callback) {
				callback(JSON.parse(response.body));
			}
		}
	);
};

var updateContact = function(id, data, callback) {
	request.post(
		{
			url: `https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`
			},
			form: JSON.stringify(data)
		},
		function(err, response) {
			if (err) {
				console.log(err);
			}

			console.log(response.body);
			if (callback) {
				callback(response.body);
			}
		}
	);
};

module.exports = {
	getContact: getContact,
	updateContact: updateContact
};