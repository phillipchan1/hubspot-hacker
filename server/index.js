/*jslint node: true */

'use strict';
var express = require('express');
var parser = require('body-parser');
var fs = require('fs');
var https = require('https');

// create instance of the server to variable app
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


// var hubspot = require('./hubspot/hubspot');

// setTimeout(function() {
// 	hubspot.getContactCountry(17990058, function(country) {
// 		console.log(country);

// 		require('./regionConverter/regionConverter').getRegion(country, function(region) {
// 			console.log(region);
// 			hubspot.updateContact(
// 				17990058,
// 				{
// 					"properties": [
// 						{
// 							"property": "newregion",
// 							"value": region
// 						}
// 					]
// 				},
// 				function(contact) {
// 					console.log(contact);
// 				}
// 			);
// 		});

// 	});
// }, 3000);


var httpsServer = https.createServer(
	{
		cert: fs.readFileSync('server/ssl/chained.pem'),
		key: fs.readFileSync('server/ssl/domain.key')
	},
	app
);

httpsServer.listen(8443, function() {
	console.log('https server running at 8443');
});

// // have our app listen on port
app.listen(process.env.PORT || 80, function() {
	console.log('Service on running on 80');
});