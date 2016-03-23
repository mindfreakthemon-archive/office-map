var gulp = require('gulp');

gulp.task('lib', function () {
	gulp.src([
			'./node_modules/leaflet/**/*.{js,css,ts}',
			'./node_modules/leaflet-curve/**/*.{js,css,ts}',
			'./node_modules/ng2-pagination/**/*.{js,css,ts}',
			'./node_modules/node-uuid/**/*.{js,css,ts}',
			'./node_modules/systemjs/dist/system.js',
			'./node_modules/rxjs/bundles/Rx.min.js',
			'./node_modules/angular2/bundles/angular2.js',
			'./node_modules/angular2/bundles/angular2-polyfills.min.js',
			'./node_modules/angular2/bundles/http.min.js',
			'./node_modules/angular2/bundles/router.js'
		], { base: 'node_modules' })
		.pipe(gulp.dest('./build/client/lib'));
});
