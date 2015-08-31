"use strict";

var gulp       = require('gulp');
var config     = require('./config');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var babelify = require('babelify');
var util = require('gulp-util');
var watchify = require('watchify');
var size       = require('gulp-size');


var browserifyTask = function(devMode) {
    var bundle = browserify({
        debug: true,
        extensions: ['.js', '.jsx'],
        entries: config.src.js+'/main.js'
    });
    if(devMode) {
        bundle = watchify(bundle);
    }
    bundle.on('update', function(){
        executeBundle(bundle);
    });
    executeBundle(bundle);
};

function executeBundle(bundle) {
    bundle
        .transform(babelify)
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(size({title: "scripts"}));
}

gulp.task('scripts', function () {
    return browserifyTask();
});

gulp.task('scripts:watch', function () {
    return browserifyTask(true);
});
