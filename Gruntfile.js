module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		env: {
			dev: {
				APPC_CLI_TITANIUM_TEST: '1'
			}
		},
		mochaTest: {
			options: {
				timeout: 3000,
				reporter: 'spec',
				ignoreLeaks: false,
				globals: [
					'_key',
					'requestSSLInitializing',
					'requestSSLInsideHook',
					'requestSSLInitialized',
					'requestSSLHooks',
					'requestSSLFingerprints'
				]
			},
			src: ['test/*_test.js']
		},
		appcJs: {
			options: {
				force: true
			},
			src: ['lib/**/*.js', 'test/**/*_test.js']
		},
		kahvesi: {
			src: ['test/*_test.js']
		},
		appcCoverage: {
			default_options: {
				src: 'coverage/lcov.info',
				force: true
			}
		},
		clean: ['tmp']
	});

	// Load grunt plugins for modules
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-appc-js');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-kahvesi');
	grunt.loadNpmTasks('grunt-appc-coverage');

	// register tasks
	var coverTasks = ['env', 'kahvesi']
		.concat(process.env.TRAVIS ? ['appcCoverage', 'clean'] : ['clean']);
	grunt.registerTask('cover', coverTasks);
	grunt.registerTask('default', ['appcJs', 'env', 'mochaTest', 'clean']);
};
