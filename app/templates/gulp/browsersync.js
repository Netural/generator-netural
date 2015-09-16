"use strict";

var gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('browsersync', function() {
	browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});


