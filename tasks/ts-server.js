var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	plumber = require('gulp-plumber'),
	inlineNG2Template = require('gulp-inline-ng2-template'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('ts-server', function () {
	var tsResult = gulp.src([
			'app/server/**/*.ts',
			//'app/shared/**/*.ts',
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
		.pipe(gulp.dest('build'));
});
