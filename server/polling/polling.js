let config = require('../../config/config');
let regionConverterPollImpl = require('./regionConverterPollImpl');

regionConverterPollImpl();

setInterval(function() {
	console.log(`Starting regionConverterPoll CRON Job on ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} at ${new Date().toLocaleTimeString()}`);
	regionConverterPollImpl();
}, config.polling_frequency);
