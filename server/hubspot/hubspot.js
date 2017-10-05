var request = require('request');
var tokens = require('../oauth/tokens.json');
var urlUtils = require('../utils/urlUtils');

var createRemovalListFromContactList = function(contactList) {
	var removeList = {
		"vids": []
	};

	contactList.forEach(
		function(contact) {
			removeList.vids.push(contact.vid);
		}
	);

	return removeList;
};

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

var getContactsInList = function(id, options, callback) {
	var parameters = '';

	if (options) {
		parameters = urlUtils.serializeQueryParameters(options);
	}

	request.get(
		{
			url: `https://api.hubapi.com/contacts/v1/lists/${id}/contacts/all${parameters}`,
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

var getTokenInformation = function(token, callback) {
	request.get({
		url: `https://api.hubapi.com/oauth/v1/access-tokens/${tokens.access_token}`,
		headers: {
			'Authorization': `Bearer ${tokens.access_token}`
		}
	}, function(err, response) {
		callback(JSON.parse(response.body));
	});
};

var removeContactsFromList = function(listId, listOfContactsToRemove, options, callback) {
	var parameters = '';
	var responseData = '';
	var success = false;

	if (options) {
		parameters = urlUtils.serializeQueryParameters(options);
	}

	request(
		{
			method: 'POST',
			json: true,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`,
				'Content-Type': 'application/json'
			},
			uri: `https://api.hubapi.com/contacts/v1/lists/${listId}/remove/${parameters}`,
			body: listOfContactsToRemove
		},
		function(err, response, body) {
			if (response.statusCode === 200) {
				callback({
					success: true,
					responseData: response.body
				});
			}

			else {
				callback({
					success: false
				});
			}
		}
	);
};

// update a single hubspot contact
var updateContact = function(id, userData, callback) {
	var responseData = '';
	var success = false;

	request.post(
		{
			url: `https://api.hubapi.com/contacts/v1/contact/vid/${id}/profile`,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`,
				'Content-Type': 'application/json'
			},
			form: JSON.stringify(userData)
		},
		function(err, response) {
			if (err) {
				console.log(err);
				responseData = err;
			} else if (response.statusCode === 204) {
				success = true;
				responseData = response.body;
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

// update a group of contacts
var updateContacts = function(contactsJSON, options, callback) {
	var parameters = '';
	var responseData = '';
	var success = false;

	if (options) {
		parameters = urlUtils.serializeQueryParameters(options);
	}

	request(
		{
			method: 'POST',
			json: true,
			headers: {
				'Authorization': `Bearer ${tokens.access_token}`,
				'Content-Type': 'application/json'
			},
			uri: `https://api.hubapi.com/contacts/v1/contact/batch/${parameters}`,
			body: contactsJSON
		},
		function(err, response, body) {
			if (err) {
				responseData = err;
			} else if (response.statusCode === 202) {
				callback({
					success: true,
					responseData: response.body
				});
			}

			else {
				callback({
					success: false
				});
			}
		}
	);
};

module.exports = {
	createRemovalListFromContactList: createRemovalListFromContactList,
	getContact: getContact,
	getContactsInList: getContactsInList,
	getTokenInformation: getTokenInformation,
	removeContactsFromList: removeContactsFromList,
	updateContact: updateContact,
	updateContacts: updateContacts
};