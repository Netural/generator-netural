var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var util         = require('gulp-util');
var globbing     = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var config       = require('./config');

gulp.task('styles', function () {
  return gulp.src(config.src.scss + '/**/*.{sass,scss}')
  	.pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', util.log.bind(util, 'Saas Error')))
    .pipe(autoprefixer({
        browsers:  [
            'ie >= 8',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css));
});
