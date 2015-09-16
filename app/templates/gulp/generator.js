var gulp = require('gulp');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var config = require('./config');
var template = require('gulp-template');

var generateSCSSComponent = function(name) {
    gulp.src(config.src.generator_templates + '/component.scss')
        .pipe(template({
            name: name
        }))
        .pipe(concat('_' + name + '.scss'))
        .pipe(gulp.dest(config.src.scss + '/components'));
}

var generateSCSSLayout = function(name) {
    gulp.src(config.src.generator_templates + '/layout.scss')
        .pipe(template({
            name: name
        }))
        .pipe(concat('_' + name + '.scss'))
        .pipe(gulp.dest(config.src.scss + '/layout'));
}

var generateHBLComponent = function(name) {
    gulp.src(config.src.generator_templates + '/component.hbs')
        .pipe(template({
            name: name
        }))
        .pipe(concat(name + '.hbs'))
        .pipe(gulp.dest(config.src.templates + '/components'));
}

var generateHBLPage = function(name) {
    gulp.src(config.src.generator_templates + '/page.hbs')
        .pipe(template({
            name: name
        }))
        .pipe(concat(name.toLowerCase() + '.hbs'))
        .pipe(gulp.dest(config.src.templates + '/pages'));
}

gulp.task('generate', function() {
    var isSCSSComponent = (typeof argv.scsscomponent !== 'string') ? false : true;
    var isSCSSLayout = (typeof argv.scsslayout !== 'string') ? false : true;
    var isPage = (typeof argv.page !== 'string') ? false : true;
    var isComponent = (typeof argv.component !== 'string') ? false : true;
    var isController = (typeof argv.controller !== 'string') ? false : true;

    if (isSCSSComponent) {
        generateSCSSComponent(argv.scsscomponent);
        console.log('SCSS Component ' + argv.scsscomponent + ' created (/styles/components/_' + argv.scsscomponent + '.scss )');
    }

    if (isSCSSLayout) {
        generateSCSSLayout(argv.scsslayout);
        console.log('SCSS Layout ' + argv.scsslayout + ' created (/styles/layout/_' + argv.scsslayout + '.scss )');
    }

    if (isComponent) {
        generateHBLComponent(argv.component);
        generateSCSSComponent(argv.component);
        console.log('Component ' + argv.component + ' created (/styles/components/_' + argv.component + '.scss & /templates/components/' + argv.component + '.hbs)');
    }

    if (isPage) {
        generateHBLPage(argv.page);
        console.log('Component ' + argv.page + ' created (/templates/pages/' + argv.page + '.hbs)');
    }

    if (isController) {
        gulp.src(config.src.generator_templates + '/controller.js')
            .pipe(template({
                name: argv.controller
            }))
            .pipe(concat(argv.controller + 'Controller.js'))
            .pipe(gulp.dest(config.src.js + '/controllers'));
        console.log('Controller ' + argv.controller + ' created (' + argv.controller + 'Controller.js)');
    }
});

gulp.task('g', ['generate']);
