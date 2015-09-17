"use strict";

var gulp = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var config = require('./config');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var browserSync = require('browser-sync');

var isProduction = (typeof argv.production !== 'undefined') ? true : false;

gulp.task('modernizr', function() {
    gulp.src(config.src.bower_components + '/modernizr/modernizr.js')
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(config.dest.js + '/vendor'))
});


gulp.task('bower', function() {

    return gulp.src('bower.json')
        .pipe(mainBowerFiles(['**/*.js'], {
            paths: {
                bowerDirectory: config.src.bower_components,
                bowerJson: 'bower.json'
            }
        }))
        .pipe(concat('vendor.js'))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulp.dest(config.dest.js + '/vendor'));
});



gulp.task('bower:watch', function() {
    watch('bower.json', function() {
        gulp.start('bower');
    });
});

gulp.task('vendor', ['modernizr', 'bower']);
