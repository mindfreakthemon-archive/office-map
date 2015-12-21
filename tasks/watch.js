var gulp = require('gulp'),
	livereload = require('gulp-livereload');

gulp.task('watch', ['nodemon'], function () {
	livereload.listen();

	gulp.watch(['app/client/**/*.ts', 'app/shared/**/*.ts'], ['ts-client']);
	gulp.watch(['assets/styles/**/*.styl'], ['styles']);
});