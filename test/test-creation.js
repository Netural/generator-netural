/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;

describe('netural generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('netural:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            'bower.json',
            'package.json',
            '.editorconfig',
            '.jshintrc',
            '.jscsrc',
            '.gitignore',
            'README.md',
            'gulp/config.json',
            'gulp/default.js',
            'gulp/clean.js',
            'gulp/build.js',
            'gulp/watch.js',
            'gulp/test.js',
            'gulp/styles.js',
            'gulp/scripts.js',
            'gulp/vendor.js',
            'gulp/serve.js',
            'gulp/templates.js',
            'gulp/images.js',
            'gulpfile.js',
            'app/styles/main.scss',
            'app/styles/_variables.scss',
            'app/styles/util/_mixins.scss',
            'app/styles/util/_pattern.scss',
            'app/styles/states/_global.scss',
            'app/scripts/main.js',
            'app/templates/layouts/default.hbs',
            'app/templates/pages/index.hbs'
        ];

        helpers.mockPrompt(this.app, {
            'projectName': 'test-project',
            'templating': 'Handlebars (clientside)'
        });
        this.app.options['skip-install'] = true;
        this.app.run()
            .on('end', function () {
                assert.file(expected);
                done();
        });
    });
});


describe('netural generator php', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp-cms'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('netural:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            'bower.json',
            'package.json',
            '.editorconfig',
            '.jshintrc',
            '.jscsrc',
            '.gitignore',
            'README.md',
            'gulp/config.json',
            'gulp/default.js',
            'gulp/clean.js',
            'gulp/build.js',
            'gulp/watch.js',
            'gulp/test.js',
            'gulp/styles.js',
            'gulp/scripts.js',
            'gulp/vendor.js',
            'gulp/serve.js',
            'gulp/templates.js',
            'gulp/images.js',
            'gulpfile.js',
            'source/styles/main.scss',
            'source/styles/_variables.scss',
            'source/styles/util/_mixins.scss',
            'source/styles/util/_pattern.scss',
            'source/styles/states/_global.scss',
            'source/scripts/main.js'
        ];

        helpers.mockPrompt(this.app, {
            'projectName': 'test-project',
            'templating': 'Twig PHP (serverside)'
        });
        this.app.options['skip-install'] = true;
        this.app.run()
            .on('end', function () {
                assert.file(expected);
                done();
        });
    });
});
