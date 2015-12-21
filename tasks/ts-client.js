var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	sourcemaps = require('gulp-sourcemaps');

gulp.task('ts-client', function () {
	var tsResult = gulp.src([
			'app/client/*.ts',
			'app/shared/*.ts',
			'node_modules/angular2-universal-preview/universal.d.ts',
			'typings/tsd.d.ts'
		], { base: 'app/' })
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
		.pipe(gulp.dest('build/client'));
});