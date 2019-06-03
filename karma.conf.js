//const istanbul = require( 'browserify-istanbul' );

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'mocha', 'chai', 'sinon', 'browserify' ],

    files: [
      //'vendor/external.js',
      'test/**/*.spec.js',
      { pattern: 'test/locales/**/*.json*', watched: true, included: false, served: true},
      { pattern: 'test/languages/**/*.json*', watched: true, included: false, served: true},
    ],

    proxies: {
      '/locales': 'http://localhost:9876/base/test/locales',
      '/languages': 'http://localhost:9876/base/test/languages'
    },

    reporters: [ 'spec'/*, 'coverage' */],

    preprocessors: {
      'test/**/*.spec.js': [ 'browserify' ],
      'src/**/*.js': [ 'browserify', 'coverage' ]
    },

    browsers: [ 'PhantomJS' ],

    port: 9876,

    //logLevel: 'LOG_DEBUG',

    //singleRun: true,
    //autoWatch: false,
    //
    // client: {
    //   mocha: {
    //     reporter: 'spec', // change Karma's debug.html to the mocha web reporter
    //     ui: 'tdd'
    //   }
    // },

    // browserify configuration
    browserify: {
      debug: true,
      transform: [
        'babelify',
        require('browserify-istanbul')({
          ignore: ['**/test/**']
        }),
      ]
    },

    coverageReporter: {
      type : 'lcov', // using fixed version from branch: https://github.com/karma-runner/karma-coverage/issues/157
      dir : 'coverage/'
    }
  });
};
