var request = require('request');
var fs = require('fs');
var config = require('../../config/config');

var getAccessToken = function(accessCode, callback) {
	request.post(
		'https://api.hubapi.com/oauth/v1/token',
		{
			form: {
				grant_type: 'authorization_code',
				client_id: config.client_id,
				client_secret: config.client_secret,
				redirect_uri: config.redirect_uri,
				code: accessCode
			}
		},
		function(err, response, body) {
			var responseObj = JSON.parse(body);
			console.log(responseObj);

			if (err) {
				callback('error');
			} else {
				if (responseObj.refresh_token) {
					saveAccessTokens(responseObj);
				}
			}
		}
	);
};

var maintainOauthConnection = function() {
	refreshAccessToken();

	setInterval(function() {
		refreshAccessToken();
	}, 600000);
};

var refreshAccessToken = function() {
	var tokens = require('./tokens.json');

	console.log('Refreshing tokens');

	request.post(
		'https://api.hubapi.com/oauth/v1/token',
		{
			form: {
				grant_type: 'refresh_token',
				client_id: config.client_id,
				client_secret: config.client_secret,
				redirect_uri: config.redirect_uri,
				refresh_token: tokens.refresh_token,
			}
		},
		function(err, response, body) {
			var responseObj = JSON.parse(body);
			console.log(responseObj);

			if (err) {
				callback('error');
			} else {
				if (responseObj.refresh_token) {
					saveAccessTokens(responseObj);
				}
			}
		}
	);
};

var saveAccessTokens = function(tokenObject, callback) {
	fs.writeFile('server/oauth/tokens.json', JSON.stringify(tokenObject), 'utf8', function(err, data) {
		if (err) {
			console.log(err);
			throw err;
		}
	});
};

module.exports = {
	getAccessToken: getAccessToken,
	maintainOauthConnection: maintainOauthConnection
};