/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options) => ({
    entry: options.entry,
    output: Object.assign({ // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
    }, options.output), // Merge with env dependent settings
    module: {
        loaders: [
            {
                test: /\.js$/, // Transform all .js files required somewhere with Babel
                loader: 'babel',
                exclude: /node_modules/,
                query: options.babelQuery,
            },
            {
                // Transform our own .css files with PostCSS and CSS-modules
                test: /\.css$/,
                exclude: /node_modules/,
                loader: options.cssLoaders,
            },
            {
                // Do not transform vendor's CSS with CSS-modules
                // The point is that they remain in global scope.
                // Since we require these CSS files in our JS or CSS files,
                // they will be a part of our compilation either way.
                // So, no need for ExtractTextPlugin here.
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
                exclude: /flexboxgrid/,
            },
            {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
                loaders: [
                    'transform-loader/cacheable?brfs',
                    'transform-loader/cacheable?packageify'
                ]
            }, {
                test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
                loader: 'transform-loader/cacheable?ejsify'
            },
            {
                test: /(\.css)$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap'),
                include: /flexboxgrid/,
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[hash].[ext]',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }],
    },
    plugins: options.plugins.concat([
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
            // make fetch available
            fetch: 'exports?self.fetch!whatwg-fetch',
        }),

        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]),
    postcss: () => options.postcssPlugins,
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: [
            '',
            '.js',
            '.jsx',
            '.react.js',
        ],
        packageMains: [
            'jsnext:main',
            'main',
        ],
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true,
});
