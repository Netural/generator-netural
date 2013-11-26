'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NeturalGenerator = module.exports = function NeturalGenerator(args, options, config) {
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
    console.log(this.yeoman);

    var prompts = [{
        name: 'projectName',
        message: 'The name of your project'
    }];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;

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
    this.copy('Gruntfile.js', 'Gruntfile.js');
};

NeturalGenerator.prototype.setupStyles = function setupStyles() {
    this.mkdir('app/styles');
    this.mkdir('app/styles/base');
    this.mkdir('app/styles/layout');
    this.mkdir('app/styles/modules');
    this.mkdir('app/styles/states');
};


NeturalGenerator.prototype.setupTemplates = function setupTemplates() {
    this.mkdir('app/templates');
    this.mkdir('app/templates/layouts');
    this.mkdir('app/templates/pages');
    this.mkdir('app/templates/partials');

    this.template('layout.hbs','app/templates/layouts/layout.hbs');
};

NeturalGenerator.prototype.setupDirectories = function setupDirectories() {
    this.mkdir('app/images');
    this.mkdir('app/scripts');
    this.mkdir('app/fonts');
};
