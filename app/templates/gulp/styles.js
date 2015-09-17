"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var globbing = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var config = require('./config');
var size = require('gulp-size');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');

var onError = function(error) {
    console.error(error);
};

gulp.task('styles', function() {

    var isProduction = (typeof argv.production !== 'undefined') ? true : false;

    return gulp.src(config.src.scss + '/**/*.{sass,scss}')
        .pipe(plumber(function(error) {
            util.log(util.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(globbing({
            extensions: ['.scss']
        }))
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(sass({
            outputStyle: isProduction ? 'compressed' : 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: config.browsers
        }))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(config.dest.css))
        .pipe(size({
            title: "styles"
        }));
});

gulp.task('styles:watch', ['styles'],  function() {
    gulp.watch(config.src.scss + '/**/*.scss', ['styles']);
});
