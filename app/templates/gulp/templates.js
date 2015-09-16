var gulp = require('gulp');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');
var extname = require('gulp-extname');
var config = require('./config');
var htmlmin = require('gulp-html-minifier');
var watch = require('gulp-watch');

gulp.task('templates', function () {


    assemble.data({site: {title: 'Blog'}});
    assemble.data([config.src.data + '/*.{json,yml}']);
    assemble.layouts([config.src.templates + '/layouts/*.hbs']);
    assemble.partials([config.src.templates+ '/components/*.hbs']);

    gulp.src(config.src.templates + '/pages/*.hbs')
    .pipe(gulpAssemble(assemble, { layout: 'default' }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(extname())
    .pipe(gulp.dest(config.dest.templates));

});

gulp.task('templates:watch', function () {
    watch(config.src.templates + '/**/*.{hbs,yaml,json}', function() {
	    gulp.start('templates' );
	});
    watch(config.src.data + '/**/*.{hbs,yaml,json}', function() {
	    gulp.start('templates' );
	});
});
