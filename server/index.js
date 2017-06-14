/*jslint node: true */

'use strict';
var express = require('express');
var parser = require('body-parser');
var fs = require('fs');
var https = require('https');

// create instance of the server
var app = express();

// get method for parsing body
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// client routes
app.use('/', express.static('client/'));

// routes
var webhookRoutes = require('./web-hooks/web-hooks.routes');
app.use('/web-hooks/', webhookRoutes);

var apiRoutes = require('./api/api.routes.js');
app.use('/api/', apiRoutes);

// direct all other routes to client-side app
app.all('/*', function ( req, res ) {
    res
        .status( 200 )
        .set( { 'content-type': 'text/html; charset=utf-8' } )
        .sendFile(process.cwd() + '/client/index.html');
});

// refresh oauth tokens
require('./oauth/oauth').maintainOauthConnection();

var httpsServer = https.createServer(
	{
		cert: fs.readFileSync('server/ssl/chained.pem'),
		key: fs.readFileSync('server/ssl/domain.key')
	},
	app
);

// start server
httpsServer.listen(8443, function() {
	console.log('https server running at 8443');
});

app.listen(process.env.PORT || 80, function() {
	console.log('Service on running on 80');
});