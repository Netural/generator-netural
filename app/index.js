'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var htmlwiring = require("html-wiring");
var _ = require("lodash");

module.exports = generators.Base.extend({

    constructor: function () {

        generators.Base.apply(this, arguments);

        this.on('end', function () {
            this.installDependencies();
        });

        this.pkg = JSON.parse(htmlwiring.readFileAsString(path.join(__dirname, '../package.json')));
    },

    prompting: function () {
        var cb = this.async();

        // have Yeoman greet the user.
        console.log("Netural Frontend project generator");

        this.prompt([{
            name: 'projectName',
            message: 'The name of your project'
        },{
            type: 'confirm',
            message: 'Include Netural company notice in JS?',
            name: 'includeNeturalNotice',
            default: true
        },{
            type: 'list',
            choices: ["None - templating only", "Content Node"],
            message: 'For which CMS are you developing?',
            name: 'cms',
            default: "None - templating only"
        },{
            type: 'list',
            choices: ["None", "Bootstrap", "UIKit"],
            message: 'Which frontend library do you want to use?',
            name: 'frontendLibrary',
            default: "None"
        },{
            type: 'confirm',
            message: 'Include mojito.js framework?',
            name: 'includeMojito',
            default: true
        }], function (answers) {

            // answers
            this.projectName = answers.projectName;
            this.projectSlug = _.kebabCase(answers.projectName);
            this.includeNeturalNotice = answers.includeNeturalNotice;
            this.cms = answers.cms;
            this.frontendLibrary = answers.frontendLibrary;
            this.includeMojito = answers.includeMojito;

            cb();
        }.bind(this));

    },

    setupProjectFiles: function() {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('jscsrc', '.jscsrc');
        this.copy('gitignore', '.gitignore');
        this.copy('readme.md', 'README.md');
    },

    setupGulp: function() {
        this.mkdir('gulp');
        this.template('gulp/build.js', 'gulp/build.js');
this.template('gulp/clean.js', 'gulp/clean.js');
        this.template('gulp/config.json', 'gulp/config.json');
        this.template('gulp/default.js', 'gulp/default.js');
        this.template('gulp/generator.js', 'gulp/generator.js');
        this.template('gulp/icons.js', 'gulp/icons.js');
        this.template('gulp/images.js', 'gulp/images.js');
        this.template('gulp/scripts.js', 'gulp/scripts.js');
        this.template('gulp/serve.js', 'gulp/serv.js');
        this.template('gulp/styles.js', 'gulp/styles.js');
        this.template('gulp/templates.js', 'gulp/templates.js');
        this.template('gulp/test.js', 'gulp/test.js');
        this.template('gulp/vendor.js', 'gulp/vendor.js');
        this.template('gulp/watch.js', 'gulp/watch.js');
        this.template('gulpfile.js', 'gulpfile.js');
    },

    setupProject: function() {
        if(this.cms === 'Content Node') {
            this._setupContentNode();
        } else {
            console.log("setupProject");
            this._setupTemplateOnly();
        }
    },

    _setupContentNode: function() {
        this.directory('webapp', 'webapp');
        this.directory('data', 'data');
        this.directory('public', 'public');
        this.copy('composer.json', 'composer.json');
    },

    _setupTemplateOnly: function() {
        this.mkdir('app');
        this.mkdir('app/images');
        this.mkdir('app/fonts');
        this.mkdir('app/data');
        this.mkdir('app/templates');
        this.mkdir('app/templates/layouts');
        this.mkdir('app/templates/pages');
        this.mkdir('app/templates/components');
        this._setupStyles('app');
        this._setupScripts('app');
        this.template('default.hbs', 'app/templates/layouts/default.hbs');
        this.template('index.hbs', 'app/templates/pages/index.hbs');
    },

    _setupStyles: function(dir) {
        var appDir = 'app'
        if(typeof dir === 'string') {
            appDir = dir;
        }
        this.mkdir(appDir+'/styles');
        this.mkdir(appDir+'/styles/base');
        this.mkdir(appDir+'/styles/layout');
        this.mkdir(appDir+'/styles/components');
        this.mkdir(appDir+'/styles/states');
        this.mkdir(appDir+'/styles/util');

        this.copy('main.scss', appDir+'/styles/main.scss');
        this.copy('variables.scss', appDir+'/styles/_variables.scss');
        this.copy('mixins.scss', appDir+'/styles/util/_mixins.scss');
        this.copy('pattern.scss', appDir+'/styles/util/_pattern.scss');
        if(this.frontendLibrary === 'None') {
            this.copy('states.scss', appDir+'/styles/states/_global.scss');
        }
    },

    _setupScripts: function(dir) {
        var appDir = 'app'
        if(typeof dir === 'string') {
            appDir = dir;
        }
        this.mkdir(appDir+'/scripts');

        if(this.includeMojito) {
            this.mkdir(appDir+'/scripts/controllers');
            this.template('mojitoSetup.js', appDir+'/scripts/mojitoSetup.js');
        }
        if(this.includeNeturalNotice) {
            this.copy('companyNotice.js', appDir+'/scripts/companyNotice.js');
        }
        this.copy('main.js', appDir+'/scripts/main.js');
    }

});
