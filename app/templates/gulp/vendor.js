"use strict";

var gulp         = require('gulp');
var config       = require('./config');

gulp.task('modernizr', function () {
    gulp.src(config.src.bower_components + '/modernizr/modernizr.js')
    .pipe(gulp.dest(config.dest.js+'/vendor'))
});

gulp.task('vendor', ['modernizr']);
