var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	plumber = require('gulp-plumber'),
	inlineNG2Template = require('gulp-inline-ng2-template'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('ts-client', function () {
	var tsResult = gulp.src([
			'app/client/**/*.ts',
			'app/shared/**/*.ts',
			'universal.d.ts',
			'typings/tsd.d.ts'
		], { base: 'app/' })
		.pipe(plumber())
		.pipe(inlineNG2Template({ base: 'app/shared', jade: true }))
		.pipe(sourcemaps.init())
		.pipe(ts({
			sortOutput: true,
			module: 'commonjs',
			moduleResolution: 'node',
			experimentalDecorators: true,
			emitDecoratorMetadata: true,
			noImplicitAny: false,
			noLib: false
		}));

	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/js'))
		.pipe(livereload());
});
