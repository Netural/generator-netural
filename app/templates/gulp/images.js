"use strict";

var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var cache    = require('gulp-cache');
var size     = require('gulp-size');
var config   = require('./config');

gulp.tasks('images', function() {
  return gulp.src(config.src.img + '/**/*.{jpg,jpeg,png,gif}')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(config.dest.img))
    .pipe(size({title: "images"}));
});
