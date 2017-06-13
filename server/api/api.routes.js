'use strict';

var express = require('express');
var router = express.Router();

var oauth = require('../oauth/oauth');

router.post('/login', function(req, res, callback) {
	console.log(req.body.code);
	oauth.getAccessToken(req.body.code, function(response) {
		console.log(response);
	});
});

module.exports = router;