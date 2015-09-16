var gulp = require('gulp');
var config = require('./config');

gulp.task('watch',  ['icons:watch'<% if(templating != 'Twig PHP (serverside)') {%>, 'templates:watch'<% } %>, 'styles:watch', 'scripts:watch', 'images:watch', 'bower:watch']);
