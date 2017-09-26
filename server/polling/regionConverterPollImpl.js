var hubspot = require('../hubspot/hubspot');
var config = require('../../config/config');

module.exports = function() {
	hubspot.getContactsInList(
		config.region_contact_list_to_clean_id,
		function(response) {
			console.log(response);
		}
	);
};