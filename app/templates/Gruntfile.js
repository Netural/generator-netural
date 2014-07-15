'use strict';

/** build with generator-netural 0.1.4 **/

module.exports = function (grunt) {
    <% if(includeProxy) {%> var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;<% } %>
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare:: 'grunt-usemin'
    });

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist'
        },
        watch: {
            sass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}', '<%%= yeoman.app %>/bower_components/{,*/}*.{scss,sass}'],
                tasks: ['sass:server'<% if(includeAutoprefixer) {%>, 'autoprefixer'<% } %>]
            },
            assemble: {
                files: ['<%%= yeoman.app %>/templates/layouts/{,*/}*.hbs',
                       '<%%= yeoman.app %>/templates/pages/{,*/}*.hbs',
                       '<%%= yeoman.app %>/templates/partials/{,*/}*.hbs',
                       '<%%= yeoman.app %>/data/{,*/}*.json'],
                tasks: ['assemble:server']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '{.tmp,<%%= yeoman.app %>}/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },
        assemble: {
            options: {
                flatten: true,
                layout: 'layout.hbs',
                layoutdir: '<%%= yeoman.app %>/templates/layouts',
                assets: 'dist/images',
                data: ['<%%= yeoman.app %>/data/*.json'],
                partials: ['<%%= yeoman.app %>/templates/partials/*.hbs']
            },
            dist: {
                files: {
                    '<%%= yeoman.dist %>/': ['<%%= yeoman.app %>/templates/pages/*.hbs']
                }
            },
            server: {
                files: {
                    '.tmp/': ['<%%= yeoman.app %>/templates/pages/*.hbs']
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ] <% if(includeProxy) {%>,
                    middleware: function(connect, options) {
                        // Same as in grunt-contrib-connect
                        var middlewares = [];
                        var directory = options.directory ||
                        options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Same as in grunt-contrib-connect
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        middlewares.push(proxySnippet);

                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }<% } %>
                }<% if(includeProxy) {%>,
                proxies: [
                    {
                        context: '/',
                        host: '0.0.0.0:9000',
                        changeOrigin: true
                    }
                ]<% } %>
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%%= yeoman.dist %>/styles/main.css' : ['<%%= yeoman.app %>/styles/main.scss']
                }
            },
            server: {
                options: {
                    debugInfo: true
                },
                files: {
                    '.tmp/styles/main.css' : ['<%%= yeoman.app %>/styles/main.scss']
                }
            }
        },<% if(includeAutoprefixer) {%>
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },<% } %>
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        'bower-install': {
            app: {
                html: '<%%= yeoman.app %>/templates/partials/scripts.hbs',
                ignorePath: '<%%= yeoman.app %>/',
                exclude: ['<%%= yeoman.app %>/bower_components/modernizr/modernizr.js']
            }
        },
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.dist %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/styles/{,*/}*.css']
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.*',
                        'fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        modernizr: {
            dist: {
                devFile: '<%%= yeoman.app %>/bower_components/modernizr/modernizr.js',
                outputFile: '<%%= yeoman.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '!<%%= yeoman.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'sass',
            'copy:styles',
            'assemble:server',<% if(includeAutoprefixer) {%>
            'autoprefixer',<% } %><% if(includeProxy) {%>
            'configureProxies:livereload',<% } %>
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
      grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
      grunt.task.run(['serve']);
    });


    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'copy',
        'htmlmin',
        'assemble:dist',
        'useminPrepare',<% if(includeAutoprefixer) {%>
        'autoprefixer',<% } %>
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'copy:dist',
        'modernizr',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
