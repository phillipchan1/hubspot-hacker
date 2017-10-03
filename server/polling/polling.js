let config = require('../../config/config');
let regionConverterPollImpl = require('./regionConverterPollImpl');
var schedule = require('node-schedule');

var regionConverterPoll = new schedule.RecurrenceRule();
regionConverterPoll.dayOfWeek = [new schedule.Range(0, 6)];
regionConverterPoll.hour = 6;
regionConverterPoll.minute = 0;

regionConverterPollImpl();
var j = schedule.scheduleJob(regionConverterPoll, function(){
	console.log(`Starting regionConverterPoll CRON Job on ${new Date().toJSON().slice(0,10).replace(/-/g,'/')} at ${new Date().toLocaleTimeString()}`);
	regionConverterPollImpl();
});

// run a poll to clean up contacts without a region
// var regionConverterPoll = setInterval(function() {
// 	regionConverterPollImpl();
// }, config.polling_frequency);