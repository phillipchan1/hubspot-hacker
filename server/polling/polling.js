let config = require('../../config/config');
let regionConverterPollImpl = require('./regionConverterPollImpl');

regionConverterPollImpl();

// run a poll to clean up contacts without a region
var regionConverterPoll = setInterval(function() {
	regionConverterPollImpl();
}, config.polling_frequency);