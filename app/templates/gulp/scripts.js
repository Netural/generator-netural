"use strict";

var gulp       = require('gulp');
var config     = require('./config');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var assign     = require('lodash.assign');
var babelify   = require('babelify');
var util       = require('gulp-util');
var size       = require('gulp-size');

var customOpts = {
  entries: [config.src.js],
  debug: true
};

var opts = assign({}, customOpts);

var browserifyTask = function(devMode) {

  var browserifyThis = function(bundleConfig) {

    var b = browserify(bundleConfig);
    b.transform(babelify);

    var bundle = function() {
      return b
        .bundle()
        .on('error', util.log.bind(util, 'Browserify Error'))
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(size({title: "scripts"}));
    };

    return bundle();
  };

  return browserifyThis(opts);
};

gulp.task('scripts', function () {
    return browserifyTask();
});

module.exports = browserifyTask;
