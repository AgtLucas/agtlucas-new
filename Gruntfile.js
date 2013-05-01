'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

module.exports = function(grunt) {
	// Project configuration
	grunt.initConfig({
		// Read the package.json
		pkg: grunt.file.readJSON('package.json'),

		// Metadata
		meta: {
			srcJsPath:		'_js/',
			deployJsPath:	'js',
			sassPath:		'sass/',
			cssPath:		'css/'
		},

		// Sass config
		sass: {
			dist: {
				files: {
					'<%= meta.cssPath %>style.css' : '<%= meta.sassPath %>style.scss'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		// Livereload
		livereload: {
			port: 35729
		},

		// Connect
		connect: {
			livereload: {
				options: {
					port: 9001,
					middleware: function(connect, options) {
						return [lrSnippet, folderMount(connect, options.base)]
					}
				}
			}
		},

		// Regarde:
		regarde: {
			watch: {
				files: ['<%= meta.sassPath %>*.scss', '*.html'],
				tasks: ['sass', 'livereload'],
				events: true
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};