var config = require('../../config/config');
var fs = require('fs');
var request = require('request');

// get initial API access token
var getAccessToken = function(accessCode, callback) {
	request.post(
		'https://api.hubapi.com/oauth/v1/token',
		{
			form: {
				client_id: config.client_id,
				client_secret: config.client_secret,
				code: accessCode,
				grant_type: 'authorization_code',
				redirect_uri: config.redirect_uri
			}
		},
		function(err, response, body) {
			var responseObj = JSON.parse(body);

			console.log(responseObj);

			if (err) {
				callback('error');
			}
			else {
				if (responseObj.refresh_token) {
					saveAccessTokens(responseObj);
				}
			}
		}
		);
};

// maintain oauth connection throughout duration of application
var maintainOauthConnection = function() {
	refreshAccessToken();

	setInterval(
		function() {
			refreshAccessToken();
		},
		600000
	);
};

// get a new access token using refresh token
var refreshAccessToken = function(callback) {
	var tokens = require('./tokens.json');

	console.log('Refreshing tokens');

	request.post(
		'https://api.hubapi.com/oauth/v1/token',
		{
			form: {
				client_id: config.client_id,
				client_secret: config.client_secret,
				grant_type: 'refresh_token',
				redirect_uri: config.redirect_uri,
				refresh_token: tokens.refresh_token
			}
		},
		function(err, response, body) {
			var responseObj = JSON.parse(body);

			if (err) {
				callback('error');
			}
			else {
				if (responseObj.refresh_token) {
					saveAccessTokens(responseObj);
				}
			}
		}
		);
};

// save token information to file
var saveAccessTokens = function(tokenObject, callback) {
	fs.writeFile(
		'server/oauth/tokens.json',
		JSON.stringify(tokenObject),
		'utf8',
		function(err, data) {
			if (err) {
				console.log(err);
				throw err;
			}
		}
	);
};

module.exports = {
	getAccessToken: getAccessToken,
	maintainOauthConnection: maintainOauthConnection
};