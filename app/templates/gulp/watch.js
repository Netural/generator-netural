var gulp = require('gulp');
var config = require('./config');

gulp.task('watch',  ['templates:watch', 'styles:watch', 'scripts:watch']);
