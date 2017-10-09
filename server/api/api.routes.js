var express = require('express');
var oauth = require('../oauth/oauth');
var router = express.Router();

router.post(
	'/login',
	function(req, res, callback) {
		oauth.getAccessTokenFromHubspot(
			req.body.code,
			function(response) {

			}
		);
	}
);

module.exports = router;