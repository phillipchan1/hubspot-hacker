var config = require('../../config/config');
var fs = require('fs');
var hubspot = require('../hubspot/hubspot');
var request = require('request');
var tokens = require('./tokens.json');

// get initial API access token from Hubspot
var getAccessTokenFromHubspot = function(accessCode, callback) {
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
	reportAccessTokenStatus();

	setInterval(
		function() {
			reportAccessTokenStatus();
			refreshAccessToken();
		},
		100000
	);
};

var reportAccessTokenStatus = function() {
	verifyAccessToken(
		function(status) {
			if (status === true) {
				return;
			} else {
				console.log(`Error: Tokens Expired. Reestablish Oauth Connection`);
			}
		}
	);
};

var verifyAccessToken = function(callback) {
	hubspot.getTokenInformation(
		tokens.access_token,
		function(response) {
			if (response.status === "error") {
				callback(false);
			} else {
				callback(true);
			}
		}
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
	getAccessTokenFromHubspot: getAccessTokenFromHubspot,
	maintainOauthConnection: maintainOauthConnection,
	verifyAccessToken: verifyAccessToken
};