var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var consolidate = require("gulp-consolidate");
var config      = require('./config');
var watch       = require('gulp-watch');

gulp.task('icons', ['styles'], function () {
    return gulp.src([config.src.icons + '/**/*.svg'])
        .pipe(iconfont({
            fontName: 'icons',
            appendUnicode: true,
            formats: ['ttf', 'eot', 'woff']
        }))
        .on('glyphs', function(glyphs, options) {
            gulp.src(config.src.generator_templates+'/_icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs.map(function(glyph) {
                        // this line is needed because gulp-iconfont has changed the api from 2.0
                        return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() };
                    }),
                    fontName: 'icons',
                    fontPath: '/fonts/'
                }))
                .pipe(gulp.dest(config.src.scss+'/base'));
        })
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('icons:watch', function () {
    watch(config.src.icons + '/**/*.svg', function() {
	    gulp.start('icons');
	});
});
