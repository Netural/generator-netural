"use strict";

var gulp = require('gulp');
var config = require('./config');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var babelify = require('babelify');
var util = require('gulp-util');
var watchify = require('watchify');
var size = require('gulp-size');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var rename = require("gulp-rename");
var browserSync = require('browser-sync');

var browserifyTask = function(devMode) {
    var isProduction = (typeof argv.production !== 'undefined') ? true : false;
    var bundle = browserify({
        debug: isProduction ? false : true,
        extensions: ['.js', '.jsx'],
        entries: config.src.js + '/main.js'
    });
    if (devMode) {
        bundle = watchify(bundle);
    }
    /*bundle.on('update', function(){
        executeBundle(bundle);
    });*/
    executeBundle(bundle);
};

function executeBundle(bundle) {
    bundle
        .transform(babelify)
        .bundle()
        .on("error", function(error) {
            util.log(util.colors.red(error.message));
        })
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(size({
            title: "scripts"
        }));
}

gulp.task('uglify', ['bundle'], function() {
    return gulp.src(config.dest.js + '/main.js')
        .pipe(uglify({
            compress: {
                unused: false,
                properties: false,
                side_effects: false
            },
            options: {
                mangle: false,
            }
        }))
        .on('error', function(error) {
            console.log(error);
        })
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(config.dest.js))
        .pipe(size({
            title: "scripts"
        }));
});

gulp.task('bundle', function() {
    return browserifyTask();
});

gulp.task('scripts', function() {
    var isProduction = (typeof argv.production !== 'undefined') ? true : false;
    if (isProduction) {
        gulp.start('uglify');
    } else {
        gulp.start('bundle');
    }

});

gulp.task('scripts:watch', function() {
    watch(config.src.js + '/**/*.js', function() {
        gulp.start('scripts');
    });
});
