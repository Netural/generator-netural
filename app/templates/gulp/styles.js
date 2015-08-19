var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var util        = require('gulp-util');
var globbing     = require('gulp-css-globbing');
var config       = require('./config');

gulp.task('styles', function () {
  return gulp.src(config.src.scss + '/**/*.{sass,scss}')
  	.pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', util.log.bind(gutil, 'Saas Error'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css));
});
