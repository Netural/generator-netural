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
    },

    setupGulp: function() {
        this.mkdir('gulp');
        this.template('gulp/config.json', 'gulp/config.json');
        this.copy('gulp/default.js', 'gulp/default.js');
        this.copy('gulp/clean.js', 'gulp/clean.js');
        this.copy('gulp/build.js', 'gulp/build.js');
        this.copy('gulp/watch.js', 'gulp/watch.js');
        this.copy('gulp/test.js', 'gulp/test.js');
        this.copy('gulp/styles.js', 'gulp/styles.js');
        this.copy('gulpfile.js', 'gulpfile.js');
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

    },

    _setupTemplateOnly: function() {
        console.log("_setupTemplateOnly");
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
    },

    _setupStyles: function(dir) {
        var stylesDir = 'app'
        if(typeof dir === 'string') {
            stylesDir = dir;
        }
        this.mkdir(stylesDir+'/styles');
        this.mkdir(stylesDir+'/styles/base');
        this.mkdir(stylesDir+'/styles/layout');
        this.mkdir(stylesDir+'/styles/modules');
        this.mkdir(stylesDir+'/styles/states');
        this.mkdir(stylesDir+'/styles/util');

        this.copy('styles.scss', stylesDir+'/styles/styles.scss');
        this.copy('mixins.scss', stylesDir+'/styles/util/mixins.scss');
        this.copy('pattern.scss', stylesDir+'/styles/util/pattern.scss');
        if(this.frontendLibrary === 'None') {
            this.copy('states.scss', stylesDir+'/styles/states/global.scss');
        }
    },

    _setupScripts: function(dir) {
        var stylesDir = 'app'
        if(typeof dir === 'string') {
            stylesDir = dir;
        }
        this.mkdir(stylesDir+'/scripts');

        if(this.includeMojito) {
            this.mkdir(stylesDir+'/scripts/controllers');
        }
    }

});
