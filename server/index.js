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

var filename = '/.well-known/acme-challenge/Cv_ngx0jR2mYmjm09rTxUs7YyP2RUescTiTrrHnixuw';

app.all(filename, function(req, res) {
	fs.readFile('.well-known/acme-challenge/Cv_ngx0jR2mYmjm09rTxUs7YyP2RUescTiTrrHnixuw', "binary", function(err, file) {
      if(err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
        return;
      }

      res.writeHead(200);
      res.write(file, "binary");
      res.end();
    });
});

var options = {
	cert: fs.readFileSync('server/ssl/chained.pem'),
	key: fs.readFileSync('server/ssl/domain.key')
};

var httpsServer = https.createServer(options, app);

httpsServer.listen(8443, function() {
	console.log('https server running at 8443');
});

// // have our app listen on port
app.listen(process.env.PORT || 80, function() {
	console.log('Service on running on 80');
});