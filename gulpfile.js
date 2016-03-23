var gulp = require('gulp');

require('requiredir')('./tasks');

gulp.task('build', ['lib', 'images', 'styles', 'ts-client', 'ts-server']);
