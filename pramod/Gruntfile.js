(function(){
	"use strict";

	module.exports = function (grunt) {

				// show elapsed time at the end
				require('time-grunt')(grunt);

				// load all grunt tasks
				require('load-grunt-tasks')(grunt);

				// Project configuration.
				grunt.initConfig({

						// Store your Package file so you can reference its specific data whenever necessary
						pkg: grunt.file.readJSON('package.json'),

						// configurable paths
						paths: {
							app: './app',
							dist: './public'
						},

						jshint: {
							files: ['Gruntfile.js',  '<%= paths.app %>/*.js'],
							options: {
								curly:   true,
								eqeqeq:  true,
								immed:   true,
								latedef: true,
								newcap:  true,
								noarg:   true,
								sub:     true,
								undef:   true,
								boss:    true,
								eqnull:  true,
								browser: true,

								globals: {
												// AMD
												module:     true,
												require:    true,
												requirejs:  true,
												define:     true,
												// Environments
												console:    true,
												// General Purpose Libraries
												$:          true,
												jQuery:     true,

												// Testing
												sinon:      true,
												describe:   true,
												it:         true,
												expect:     true,
												beforeEach: true,
												afterEach:  true
											}
										}
									},

									uglify: {
										my_target: {
											files: [{
												expand: true,
												cwd: '<%= paths.app %>/scripts',
												src: '**/*.js',
												dest: './public/scripts'
											}]
										}
									},

			// Sass Config
			sass: {
				options: {
					cacheLocation: '.tmp/.sass-cache'
				},
				dev: {
					options: {
						style: 'expanded',
						lineComments: true
					},
					files: [{
						expand: true,
						cwd: '<%= paths.app %>/styles/sass',
						dest: '<%= paths.app %>/styles',
						src: ['screen.scss'],
						ext: '.css'
					}]
				}
			},

			// Site will build with included html files
			processhtml: {
				dist: {
					options: {
						process: true,
						recursive: true,
						includeBase: 'app/includes/'
					},
					files: [{
						expand: true,
						cwd: 'app/',
						src: ['**/*.html'],
						dest: 'public/',
						ext: '.html'
					}]
				}
			},

			htmlmin: {
				dist: {
					options: {
						removeComments: false,
						collapseWhitespace: false
					},
					files: [{
						expand: true,
						dot: false,
						cwd: '<%= paths.dist %>',
						dest: '<%= paths.dist %>',
						src: ['**/*.html', '!bower_components/**/*.html']
					}]
				}
			},

			cssmin: {
				dev: {
					files: [{
						expand: true,
						cwd: '<%= paths.app %>/styles',
						src: ['*.css', '!*.min.css'],
						dest: '<%= paths.app %>/styles',
						ext: '.min.css'
					}]
				},
				target: {
					files: [{
						expand: true,
						cwd: '<%= paths.app %>/styles',
						src: ['*.css', '!*.min.css'],
						dest: '<%= paths.dist %>/styles',
						ext: '.min.css'
					}]
				}
			},

			watch: {
				sass: {
					files: [
					'Gruntfile.js', 
					'app/scripts/*.js', 
					'app/styles/**/*.scss'
					],
					tasks: ['sass:dev', 'cssmin:dev']
				},
				livereload: {
					options: {
						livereload: true
					},
					files: [
					'<%= paths.app %>/scripts/*.js', 
					'<%= paths.app %>/**/*.html', 
					'<%= paths.app %>/styles/**/*.scss'
					]
				}
			},

			connect: {
				server: {
					options: {
						port: 8000,
						base: './app',
						livereload: true
					}
				},
				staging: {
					options: {
						port: 8001,
						base: './public',
						livereload: true
					}
				}
			},
			
			open: {
				dev : {
					path: 'http://localhost:8000'
				},
				staging : {
					path: 'http://localhost:8001'        
				}
			},

			copy: {
				main: {
					files: [
					{
						expand: true, 
						cwd: 'app/bower_components/', 
						src: ['**'], 
						dest: 'public/bower_components'
					},
					{
						expand: true, 
						cwd: 'app/fonts/', 
						src: ['**'], 
						dest: 'public/fonts'
					},
					{
						expand: true, 
						cwd: 'app/videos/', 
						src: ['**'], 
						dest: 'public/videos'
					},
					{
						expand: true, 
						cwd: 'app/styles/', 
						src: ['plugins/**'], 
						dest: 'public/styles'
					},
					{
						expand: true, 
						cwd: 'app/images/', 
						src: ['**'], 
						dest: 'public/images'
					},
					{
						src: 'app/bower.json', 
						dest: 'public/bower.json'
					},
					{
						expand: true, 
						cwd: 'app/favicons', 
						src: ['**'], 
						dest: 'public/favicons'
					},
					{
						src: 'app/favicon.ico', 
						dest: 'public/favicon.ico'
					}
					]
				}
			},

			clean: ['public']
		});

				// Server Task
				grunt.registerTask('serve', [
					'connect',
					'sass:dev',
					'open',
					'watch'

					]);
				
				// Default Task
				grunt.registerTask('default', [
					'clean',
					'processhtml',
					'htmlmin',
					'sass:dev',
					'cssmin:target',
					'copy',
					'uglify'

					]);
			};

		}());