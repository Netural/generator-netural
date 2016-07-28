"use strict";

var config = require('./config');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var babelify = require('babelify');
var util = require('gulp-util');
var watchify = require('watchify');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var rename = require("gulp-rename");
var browserSync = require('browser-sync');

var browserifyTask = function(devMode) {
    var isProduction = (typeof argv.production !== 'undefined') ? true : false;
    var opts = {
        debug: isProduction ? false : true,
        extensions: ['.js', '.jsx'],
        entries: config.src.js + '/main.js',
        transform: 'babelify'
    };
    
    if(devMode) {
      opts = assign({}, watchify.args, opts);
    }
    
    var bundle = browserify(opts);
    if(devMode) {
        bundle = watchify(bundle);
        bundle.on('update', function(){
            executeBundle(bundle);
        });
    }
    return executeBundle(bundle);
};

function executeBundle(bundle) {
    return bundle
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
    return browserifyTask(false);
});

gulp.task('scripts', ['uglify']);

gulp.task('scripts:watch', function() {
    return browserifyTask(true);
});
