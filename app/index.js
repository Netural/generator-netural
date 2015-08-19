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
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('jscsrc', '.jscsrc');
        this.copy('gitignore', '.gitignore');
    },

    setupGulp: function() {
        this.mkdir('gulp');
        this.template('gulpconfig.js', 'gulpconfig.js');
        this.copy('gulpfile.js', 'gulpfile.js');
    }
});
