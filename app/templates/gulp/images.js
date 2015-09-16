"use strict";

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var size = require('gulp-size');
var config = require('./config');
var del = require('del');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

gulp.task('images', function() {
    del.sync([config.dest.images]);
    return gulp.src(config.src.images + '/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.dest.images))
        .pipe(size({
            title: "images"
        }));
});

gulp.task('images:watch', function() {
    watch(config.src.images + '/**/*', function() {
        gulp.start('images');
    });
});
