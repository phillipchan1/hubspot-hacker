var request = require('request');
var tokens = require('../oauth/tokens.json');

// get a single hubspot contact
var getContact = function(id, callback) {
	var success = false;
	var responseData = '';

	request.get(
		{
			url: `https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`
			}
		},
		function(err, response) {
			if (err) {
				responseData = err;
			} else {
				success = true;
				responseData = JSON.parse(response.body);
			}

			if (callback) {
				callback({
					success: success,
					responseData: responseData
				});
			}
		}
	);
};

var getContactsInList = function(id, callback) {
	request.get(
		{
			url: `https://api.hubapi.com/contacts/v1/lists/${id}/contacts/all`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`
			}
		},
		function(err, response) {
			if (err) {
				responseData = err;
			} else {
				success = true;
				responseData = JSON.parse(response.body);
			}

			if (callback) {
				callback({
					success: success,
					responseData: responseData
				});
			}
		}
	);
};

// update a single hubspot contact
var updateContact = function(id, userData, callback) {
	var success = false;
	var responseData = '';

	request.post(
		{
			url: `https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`
			},
			form: JSON.stringify(userData)
		},
		function(err, response) {
			if (err) {
				console.log(err);
				responseData = err;
			} else {
				success = true;
				responseData = response.body;
				console.log(response.body);
			}

			if (callback) {
				callback({
					success: success,
					responseData: responseData
				});
			}
		}
	);
};



module.exports = {
	getContact: getContact,
	getContactsInList: getContactsInList,
	updateContact: updateContact
};