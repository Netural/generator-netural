var gulp = require('gulp');

gulp.task('build', ['clean', 'templates', 'styles', 'vendor', 'scripts', 'images']);
