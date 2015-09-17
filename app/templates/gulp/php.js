"use strict";

var gulp = require('gulp'),
	connect = require('gulp-connect-php'),
	browserSync = require('browser-sync');

gulp.task('php', function() {
	connect.server({
		base: 'public'
	}, function (){
		browserSync({
			proxy: 'localhost:8000'
		});
	});
});
