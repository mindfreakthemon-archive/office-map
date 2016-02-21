var gulp = require('gulp'),
	livereload = require('gulp-livereload');

gulp.task('build', ['images', 'styles', 'ts-client', 'ts-server', 'generate-mocks']);

gulp.task('watch', ['nodemon', 'build'], function () {
	livereload.listen();

	gulp.watch(['app/client/**/*.ts', 'app/shared/**/*.ts', 'app/**/*.jade', 'public/mocks/*.json'], ['ts-client']);
	gulp.watch(['assets/styles/**/*.styl'], ['styles']);
	gulp.watch(['assets/images/**/*.png'], ['images']);
});
