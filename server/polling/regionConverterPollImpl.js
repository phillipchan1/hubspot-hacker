var config = require('../../config/config');
var hubspot = require('../hubspot/hubspot');
var listUtils = require('../utils/listUtils');
var moment = require('moment');
var regionConverter = require('../regionConverter/regionConverter');

module.exports = function() {
	var startTime = new Date().getTime();
	var vidOffset = 0;

	console.log(`STARTING ON LIST ${config.region_contact_list_to_clean_id}\n`);

	var i = function() {
		setTimeout(function() {

			// get all contacts in the list that needs to be cleaned up
			hubspot.getContactsInList(
				config.region_contact_list_to_clean_id,
				{
					property: 'country',
					vidOffset: vidOffset
				},
				function(response) {
					var currentContactsSet = response.responseData.contacts;
					var responseFromContactList = response;

					if (listUtils.isNotEmpty(currentContactsSet)) {
						var pCounter = 0;
						var maxIterations = currentContactsSet.length;

						var p = function() {
							var contact = currentContactsSet[pCounter];

							// for each contact, add the region to contact based on its country
							setTimeout(function() {
								regionConverter.addRegionToContact(contact.vid, function(response) {

									// finish iteration through the list
									if (pCounter < maxIterations) {
										p();
										pCounter++;
									}

									// once done iteration through current Contact set, then go through
									// the next set until all of the sets are complete
									else {
										pCounter = 0;
										vidOffset = responseFromContactList.responseData['vid-offset'];

										if (responseFromContactList.responseData['has-more']) {
											i();
										} else {
											let timeToFinish = moment.duration(new Date().getTime() - startTime);


											console.log(`\nCOMPLETED THE LIST IN ${timeToFinish.humanize()}`);
										}
									}
								});
							}, 250);
						};

						p();
					}
				}
			);
		}, 1000);
	};

	i();
};