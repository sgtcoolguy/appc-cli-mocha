module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		env: {
			dev: {
				APPC_CLI_TITANIUM_TEST: '1'
			}
		},
		mocha_istanbul: {
			coverage: {
				src: ['test/*_test.js'],
				options: {
					timeout: 3000,
					ignoreLeaks: false,
					reporter: 'mocha-jenkins-reporter',
					reportFormats: ['lcov', 'cobertura'],
					globals: [
						'_key',
						'requestSSLInitializing',
						'requestSSLInsideHook',
						'requestSSLInitialized',
						'requestSSLHooks',
						'requestSSLFingerprints'
					]
				}
			}
		},
		appcJs: {
			check: {
				options: {
					force: true
				},
				src: ['lib/**/*.js', 'test/**/*_test.js']
			}
		},
		clean: {
			test: ['tmp'],
			cover: ['coverage']
		},
	});

	// Load grunt plugins for modules
	grunt.loadNpmTasks('grunt-appc-js');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-mocha-istanbul');

	grunt.registerTask('default', ['clean:test', 'appcJs:check', 'env:dev', 'mocha_istanbul:coverage', 'clean:test']);
};
