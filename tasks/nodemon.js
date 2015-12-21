var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('nodemon', ['ts-server'], function () {
	nodemon({
		script: 'build/server/server/bootstrap.js',
		ext: 'ts',
		watch: ['app/server', 'app/shared'],
		tasks: ['ts-server']
	});
});