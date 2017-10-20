/*jslint node: true */

'use strict';
var express = require('express');
var fs = require('fs');
var https = require('https');
var parser = require('body-parser');
var oauth = require('./oauth/oauth');
var regionConverter = require('./regionConverter/regionConverter');

// create instance of the server
var app = express();

// get method for parsing body
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// refresh oauth tokens
oauth.maintainOauthConnection();

// client routes
app.use('/', express.static('client/'));

// routes
var webhookRoutes = require('./web-hooks/web-hooks.routes');

app.use('/web-hooks/', webhookRoutes);

var apiRoutes = require('./api/api.routes.js');

app.use('/api/', apiRoutes);

// run polls
require('./polling/polling');

// keep map of countries in application definition
regionConverter.maintainUpdatedMap();

// direct all other routes to client-side app
app.all(
	'/*',
	function(req, res) {
		res
			.status(200)
			.set(
				{
					'content-type': 'text/html; charset=utf-8'
				}
			)
			.sendFile(process.cwd() + '/client/index.html');
	}
	);



var httpsServer = https.createServer(
	{
		cert: fs.readFileSync('server/ssl/chained.pem'),
		key: fs.readFileSync('server/ssl/domain.key')
	},
	app
);

// start server
httpsServer.listen(
	8443,
	function() {
		console.log('https server running at 8443');
	}
);

app.listen(
	process.env.PORT || 80,
	function() {
		console.log('Service on running on 80');
	}
);