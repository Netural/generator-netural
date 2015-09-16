var gulp = require('gulp');
var config = require('./config');
var server = require('gulp-server-livereload');

gulp.task('serve', ['build', 'watch'], function() {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});
