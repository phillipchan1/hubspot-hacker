let regionConverterPollImpl = require('./regionConverterPollImpl');
let pollingFrequency = 5000;

// run a poll to clean up contacts without a region
var regionConverterPoll = setInterval(function() {
	regionConverterPollImpl();
}, pollingFrequency);