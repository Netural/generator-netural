'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NeturalGenerator = module.exports = function NeturalGenerator(args, options, config) {
    var self = this;

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NeturalGenerator, yeoman.generators.Base);

NeturalGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log("Netural Frontend project generator");

    var prompts = [{
        name: 'projectName',
        message: 'The name of your project'
    },{
        type: 'confirm',
        message: 'Include autoprefixer?',
        name: 'includeAutoprefixer',
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.includeAutoprefixer = props.includeAutoprefixer;

        cb();
    }.bind(this));
};

NeturalGenerator.prototype.app = function app() {
    this.mkdir('app');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
};

NeturalGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.template('Gruntfile.js', 'Gruntfile.js');
};


NeturalGenerator.prototype.setupScripts = function setupScripts() {
    this.mkdir('app/scripts');
    this.copy('main.js', 'app/scripts/main.js')
};

NeturalGenerator.prototype.setupStyles = function setupStyles() {
    this.mkdir('app/styles');
    this.mkdir('app/styles/base');
    this.mkdir('app/styles/layout');
    this.mkdir('app/styles/modules');
    this.mkdir('app/styles/states');

    this.copy('main.scss', 'app/styles/main.scss');
};


NeturalGenerator.prototype.setupTemplates = function setupTemplates() {
    this.mkdir('app/templates');
    this.mkdir('app/templates/layouts');
    this.mkdir('app/templates/pages');
    this.mkdir('app/templates/partials');

    this.template('layout.hbs','app/templates/layouts/layout.hbs');
    this.template('index.hbs','app/templates/pages/index.hbs');
    this.template('scripts.hbs','app/templates/partials/scripts.hbs');
};

NeturalGenerator.prototype.setupDirectories = function setupDirectories() {
    this.mkdir('app/images');
    this.mkdir('app/scripts');
    this.mkdir('app/fonts');
};
