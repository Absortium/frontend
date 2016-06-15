const webpackConfig = require('../webpack/webpack.test.babel');
const path = require('path');

module.exports = (config) => {
    config.set({
        frameworks: ['mocha'],
        reporters: ['coverage', 'mocha'],

        mochaReporter: {
            showDiff: true
        },

        browsers: ['PhantomJS'],

        // you can define custom flags
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    },
                },
                flags: ['--load-images=true'],
                debug: true
            }
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        autoWatch: false,
        singleRun: true,

        files: [
            {
                pattern: './test-bundler.js',
                watched: false,
                served: true,
                included: true,
            },
        ],

        preprocessors: {
            ['./test-bundler.js']: ['webpack', 'sourcemap'], // eslint-disable-line  no-useless-computed-key
        },

        webpack: webpackConfig,

        // make Webpack bundle generation quiet
        webpackMiddleware: {
            noInfo: true,
            watchOptions: {
                aggregateTimeout: 100,
                poll: true
            },
        },

        coverageReporter: {
            dir: path.join(process.cwd(), 'coverage'),
            reporters: [
                { type: 'lcov', subdir: 'lcov' },
                { type: 'html', subdir: 'html' },
                { type: 'text-summary' },
            ],
        },

    });
};
