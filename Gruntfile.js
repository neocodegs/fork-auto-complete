module.exports = grunt => {
  function loadConfig(path) {
    let glob = require('glob');
    let object = {};

    glob.sync('*', { cwd: path }).forEach(option => {
      let key = option.replace(/\.js$/, '');
      let data = require(path + option);
      object[key] = typeof data === 'function' ? data(grunt) : data;
    });

    return object;
  }

  const config = {
    pkg: grunt.file.readJSON('package.json'),

    files: {
      js: {
        src: 'src/init.js',
        out: 'build/<%= pkg.name %>.js'
      },
      css: {
        main: {
          src: 'scss/main.scss',
          out: 'build/<%= pkg.name %>.css'
        }
      },
      html: {
        src: 'templates/*.html',
        out: 'build/tmp/compiled-templates.js'
      }
    },
    banners: {
      unminified:
      `/*!
      * <%= pkg.prettyName %> v<%= pkg.version %>
      * <%= pkg.homepage %>
      *
      * Copyright (c) 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>
      * License: <%= pkg.license %>
      *
      * Generated at <%= grunt.template.today("yyyy-mm-dd HH:MM:ss o") %>
      */`,
      minified: '/*! <%= pkg.prettyName %> v<%= pkg.version %> License: <%= pkg.license %> */'
    }
  };

  grunt.util._.extend(config, loadConfig('./grunt/options/'));
  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt); 


  grunt.registerTask('default', ['clean', 'ngtemplates', 'rollup', 'sass']);
};
