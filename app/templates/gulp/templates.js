var gulp = require('gulp');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');
var extname = require('gulp-extname');
var config = require('./config');
var htmlmin = require('gulp-html-minifier');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

gulp.task('templates', function() {

    var isProduction = (typeof argv.production !== 'undefined') ? true : false;

    assemble.data({
        site: {
            title: 'Blog'
        }
    });
    assemble.data([config.src.data + '/*.{json,yml}']);
    assemble.layouts([config.src.templates + '/layouts/*.hbs']);
    assemble.partials([config.src.templates + '/components/*.hbs']);

    gulp.src(config.src.templates + '/pages/*.hbs')
        .pipe(plumber(function(error) {
            util.log(util.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(gulpAssemble(assemble, {
            layout: 'default'
        }))
        .pipe(gulpif(isProduction, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(extname())
        .pipe(gulp.dest(config.dest.templates));

});

gulp.task('templates:watch', function() {
    gulp.watch(config.src.templates + '/**/*.{hbs,yaml,json}', ['templates']);
    gulp.watch(config.src.data + '/**/*.{hbs,yaml,json}', ['templates']);
});
