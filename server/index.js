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
app.use('/', express.static('/client/'));

// routes
var webhookRoutes = require('./web-hooks/web-hooks.routes');
app.use('/web-hooks/', webhookRoutes);

// direct all other routes to client-side app
app.all('/*', function ( req, res ) {
    res
        .status( 200 )
        .set( { 'content-type': 'text/html; charset=utf-8' } )
        .sendFile(process.cwd() + '/client/index.html');
});

var options = {
	key: fs.readFileSync('server/ssl/mykey.pem'),
	cert: fs.readFileSync('server/ssl/my-cert.pem')
}

var httpsServer = https.createServer(options, app);

httpsServer.listen(80, function() {
	console.log('server running at 80');
});

// have our app listen on port 3000
// app.listen(process.env.PORT || 80, function() {
// 	console.log('Service on running on 80');
// });