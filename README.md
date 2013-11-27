# generator-netural [![Build Status](https://secure.travis-ci.org/ddprrt/generator-netural.png?branch=master)](https://travis-ci.org/ddprrt/generator-netural)

A generator for [Yeoman](http://yeoman.io), for [Netural](http://netural.com) front-end projects.


## Getting Started

To install generator-netural from npm, run:

```
$ npm install -g generator-netural
```

Finally, initiate the generator:

```
$ yo netural
```

Netural's generator prompts you for your project name and if you want to use Autoprefixer.
If you install any bower dependencies, be sure to run

```
grunt bower-install
```

after scaffolding

## What's in the package?

Netural's front-end generator sets up a project including:

* [connect](http://www.senchalabs.org/connect/) Server
* [Sass](http://sass-lang.com) compilation
* Minifaction
* [Assemble](http://assemble.io) for template generation
* Optional autoprefixer


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
