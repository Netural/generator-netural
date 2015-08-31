var gulp = require('gulp');
var config = require('./config');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var babelify = require('babelify');
var util = require('gulp-util');
var watchify = require('watchify');

var customOpts = {
  entries: [config.src.js],
  debug: true
}

var opts = assign({}, watchify.args, customOpts);

var browserifyTask = function(devMode) {

  var browserifyThis = function(bundleConfig) {

    var b = browserify(bundleConfig);
    b.transform(babelify)

    var bundle = function() {
      return b
        .bundle()
        .on('error', util.log.bind(util, 'Browserify Error'))
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.dest.js));
    };

    if(devMode) {
        b = watchify(b);
        b.on('update', bundle);
        b.on('log', util.log);
    }

    return bundle();
  };

  return browserifyThis(opts);
};

gulp.task('scripts', function () {
    return browserifyTask();
});

gulp.task('scripts:watch', function () {
    return browserifyTask(true);
});
