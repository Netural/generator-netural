var gulp = require('gulp');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');
var extname = require('gulp-extname');
var config = require('./config');
var htmlmin = require('gulp-html-minifier');

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
    gulp.watch(config.src.templates + '/**/*.{hbs,yaml,json}', ['templates']);
    gulp.watch(config.src.data + '/**/*.{hbs,yaml,json}', ['templates']);
});
