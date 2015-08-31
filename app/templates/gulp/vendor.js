"use strict";

var gulp         = require('gulp');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var config       = require('./config');

gulp.task('modernizr', function () {
    gulp.src(config.src.bower_components + '/modernizr/modernizr.js')
    .pipe(gulp.dest(config.dest.js+'/vendor'))
});


gulp.task('bower', function() {
    return gulp.src(mainBowerFiles(), { base: config.src.bower_components })
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(config.dest.js+'/vendor'));
});

gulp.task('vendor', ['modernizr', 'bower']);
