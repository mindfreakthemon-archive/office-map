var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	nodemon = require('gulp-nodemon'),
	livereload = require('gulp-livereload'),
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

gulp.task('ts-server', function () {
	var tsResult = gulp.src([
			'app/server/*.ts',
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
		.pipe(gulp.dest('build/server'));
});

gulp.task('nodemon', ['ts-server'], function () {
	nodemon({
		script: 'build/server/server/bootstrap.js',
		ext: 'ts',
		watch: ['app/server', 'app/shared'],
		tasks: ['ts-server']
	});
});