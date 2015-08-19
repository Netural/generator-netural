"use strict";

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var util         = require('gulp-util');
var globbing     = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var config       = require('./config');
var size         = require('gulp-size');

gulp.task('styles', function () {
  return gulp.src(config.src.scss + '/**/*.{sass,scss}')
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', util.log.bind(util, 'Sass Error')))
    .pipe(autoprefixer({
        browsers: config.browsers
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css))
    .pipe(size({title: "styles"}));
});
