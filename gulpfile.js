var gulp = require('gulp');

require('requiredir')('./tasks');

gulp.task('build', ['images', 'styles', 'ts-client', 'ts-server']);
