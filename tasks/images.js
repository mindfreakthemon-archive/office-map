var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    flatten = require('gulp-flatten');

gulp.task('images', function () {
    gulp.src('./assets/images/**/*.png')
        //.pipe(flatten())
        .pipe(gulp.dest('./public/images'))
        .pipe(livereload());
});
