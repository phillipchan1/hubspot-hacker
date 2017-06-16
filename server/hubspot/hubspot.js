var request = require('request');
var tokens = require('../oauth/tokens.json');

// get a single hubspot contact
var getContact = function(id, callback) {
	var success = false;
	var data = '';

	request.get(
		{
			url: `https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`
			}
		},
		function(err, response) {
			if (err) {
				data = err;
			} else {
				success = true;
				data = JSON.parse(response.body)
			}

			if (callback) {
				callback({
					success: success,
					data: data
				});

				callback(JSON.parse(response.body));
			}
		}
	);
};

// update a single hubspot contact
var updateContact = function(id, data, callback) {
	var success = false;
	var data = '';

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
				data = err;
			} else {
				success = true;
				data = response.body;
				console.log(response.body);
			}

			if (callback) {
				callback({
					success: success,
					data: data
				});
			}
		}
	);
};

module.exports = {
	getContact: getContact,
	updateContact: updateContact
};