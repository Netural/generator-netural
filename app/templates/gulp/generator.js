var gulp = require('gulp');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var config = require('./config');
var template = require('gulp-template');
var footer = require('gulp-footer');
var fs = require('fs');

var generateSCSSComponent = function(name) {
    return gulp.src(config.src.generator_templates + '/component.scss')
        .pipe(template({
            name: name
        }))
        .pipe(concat('_' + name + '.scss'))
        .pipe(gulp.dest(config.src.scss + '/components'));
}

var generateSCSSLayout = function(name) {
    return gulp.src(config.src.generator_templates + '/layout.scss')
        .pipe(template({
            name: name
        }))
        .pipe(concat('_' + name + '.scss'))
        .pipe(gulp.dest(config.src.scss + '/layout'));
}

var generateHBLComponent = function(name) {
    return gulp.src(config.src.generator_templates + '/component.hbs')
        .pipe(template({
            name: name
        }))
        .pipe(concat(name + '.hbs'))
        .pipe(gulp.dest(config.src.templates + '/components'));
}

var generateHBLPage = function(name) {
    return gulp.src(config.src.generator_templates + '/page.hbs')
        .pipe(template({
            name: name
        }))
        .pipe(concat(name.toLowerCase() + '.hbs'))
        .pipe(gulp.dest(config.src.templates + '/pages'));
}

var generateHBLLayout = function(name) {
    return gulp.src(config.src.generator_templates + '/layout.hbs')
        .pipe(template({
            name: name
        }))
        .pipe(concat(name.toLowerCase() + '.hbs'))
        .pipe(gulp.dest(config.src.templates + '/layout'));
}

var generateController = function(name) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var firstChar = name.slice(0,1);
    if(chars.indexOf(firstChar) === -1) {
        name = name.replace(firstChar, firstChar.toUpperCase());
    }
    console.log(name.indexOf('Controller'));
    if(name.indexOf('Controller') === -1) {
        name += 'Controller';
    }
    var stream = gulp.src(config.src.generator_templates + '/controller.js')
        .pipe(template({
            name: name
        }))
        .pipe(concat(name + '.js'))
        .pipe(gulp.dest(config.src.js + '/controllers'));
    var setupFile = fs.readFileSync(config.src.js + '/mojitoSetup.js').toString();
    if(setupFile.indexOf(name) === -1) {
        var setupTemplate = fs.readFileSync(config.src.generator_templates + '/controllerSetup.js').toString();
        gulp.src(config.src.js+'/mojitoSetup.js')
            .pipe(footer(setupTemplate, { name : name} ))
            .pipe(gulp.dest(config.src.js));   
    }
    console.log('Controller ' + name + ' created (' + name + '.js)');
    return stream;
}

gulp.task('generate', function() {
    var isSCSSComponent = (typeof argv.scsscomponent !== 'string') ? false : true;
    var isSCSSLayout = (typeof argv.scsslayout !== 'string') ? false : true;
    var isPage = (typeof argv.page !== 'string') ? false : true;
    var isLayout = (typeof argv.layout !== 'string') ? false : true;
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

    if (isLayout) {
        generateHBLLayout(argv.layout);
        console.log('Component ' + argv.page + ' created (/templates/layout/' + argv.layout + '.hbs)');
    }

    if (isController) {
        generateController(argv.controller);
    }
});

gulp.task('g', ['generate']);
