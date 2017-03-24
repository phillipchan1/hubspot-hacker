var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('run-server-spec', function (done) {
  return gulp.src(['server/**/*spec.js'], {read: false})
    .pipe(mocha({
    	reporter: 'dot',
    	timeout: 3000
    })
    .on("error", handleError))
});

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('spec', function() {
	gulp.watch(
		[
			'server/**/*.js',
			'**/*.spec.js'
		]
		,[
			'run-server-spec'
		]
	)
});