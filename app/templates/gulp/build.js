var gulp = require('gulp');

gulp.task('build', ['clean', 'templates', 'icons', 'vendor', 'scripts', 'images']);
