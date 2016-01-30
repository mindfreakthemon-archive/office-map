var gulp = require('gulp'),
	livereload = require('gulp-livereload');

gulp.task('build', ['styles', 'ts-client', 'ts-server', 'generate-mocks']);

gulp.task('watch', ['nodemon', 'build'], function () {
	livereload.listen();

	gulp.watch(['app/client/**/*.ts', 'app/shared/**/*.ts', 'app/**/*.jade'], ['ts-client']);
	gulp.watch(['assets/styles/**/*.styl'], ['styles']);
});
