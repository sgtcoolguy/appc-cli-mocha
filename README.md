appc-cli-mocha [![Build Status](https://travis-ci.org/muhammaddadu/appc-cli-mocha.svg?branch=master)](https://travis-ci.org/muhammaddadu/appc-cli-mocha)
=========

* [Features](#features)
* [Getting started and configuration](#getting-started)
* [API](#API)

### Features

* Authomatically redirects all trafic from the appc-cli to the internal request mocker
* Added support for OS specific tests
* Logs from appc-logger are automatically stored for easy access

### Getting started

    $ npm install -g appc-cli-mocha

This library depends on [MochaJS](http://mochajs.org/).

### API

All the features of appc-cli-mocha can be accessed as a library.

```JavaScript
var core = require('appc-cli-mocha');
```

```JavaScript
core.newTest('', {
	endpoints: [
		{
			method: 'all',
			path: '/*',
			/** [execute description] */
			handle: function (req, opts, res, next) {
				console.log('[MOCK-ADDR]', req.url);
				return next();
			}
		}...
	]
}, function (err, plugin) {
	var appc = this.appc,
		tmpDir = this.tmpDir,
		async = appc.async;

	describe('OS restrictive conditional tests', function () {
		it.mac('mac only condition', function () {

		});

		it.linux('linux only condition', function () {

		});

		it.win('win only condition', function () {

		});
	});

	describe('express test', function () {
		it('endpoint /test', function (done) {
			request({
				method: 'get',
				url: 'http://127.0.0.1:8118/test',
				json: true
			}, function (err, req, res) {
				should.not.exist(err);
				should(res).have.property('success');
				return done();
			});
		});
	});
});
```