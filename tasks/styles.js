var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
	gulp.src('./assets/styles/**/*.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload());
});
 