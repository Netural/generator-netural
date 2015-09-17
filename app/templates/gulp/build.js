var gulp = require('gulp');

gulp.task('build', [<% if(templating != 'Twig PHP (serverside)') {%>'clean', 'templates', <% } %>'icons', 'vendor', 'scripts', 'images']);
