"use strict";

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var util         = require('gulp-util');
var globbing     = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var config       = require('./config');
var size         = require('gulp-size');

var onError = function(error) {
	console.error(error);
};

gulp.task('styles', function () {
  return gulp.src(config.src.scss + '/**/*.{sass,scss}')
    .pipe(globbing({
        extensions: ['.scss']
    }))
    //.pipe(sourcemaps.init())
    .pipe(plumber({
		errorHandler: onError
	}))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: config.browsers
    }))
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css))
    .pipe(size({title: "styles"}));
});

gulp.task('styles:watch', function () {
    gulp.watch(config.src.scss + '/**/*.scss', ['styles']);
});
