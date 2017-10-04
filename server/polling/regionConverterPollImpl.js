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

			// get all the contacts in the list
			hubspot.getContactsInList(
				config.region_contact_list_to_clean_id,
				{
					property: 'country',
					count: 50,
					vidOffset: vidOffset
				},
				function(response) {
					let contacts = response.responseData.contacts;
					let responseFromContactList = response;

					// get HS-formatted JSON of updated contacts with appropriate region
					let contactsWithRegions = regionConverter.getRegionForContacts(contacts);

					// get HS-formatted list of contacts to remove from list after done processing
					let contactsToRemove = hubspot.createRemovalListFromContactList(contacts);

					// update batch of them
					hubspot.updateContacts(
						contactsWithRegions,
						null,
						function(response) {
							if (response.success === true) {

								hubspot.removeContactsFromList(
									config.region_contact_list_to_clean_id,
									contactsToRemove,
									null,
									function(response) {

										console.log("Batch of Contacts Updated and Removed Successfully");

										if (responseFromContactList.responseData['has-more']) {
											vidOffset = responseFromContactList.responseData['vid-offset'];
											i();

										}

										else {
											let timeToFinish = moment.duration(new Date().getTime() - startTime);

											console.log(`\nCOMPLETED THE LIST IN ${timeToFinish.humanize()}`);
										}
									}
								);
							}
						}
					);
				}
			);
		}, 1000);
	};

	i();
};