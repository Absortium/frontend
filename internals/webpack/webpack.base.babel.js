/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const autoBahnLoaders = () => {
  return [
    {
      // Fix issue with autobahn https://github.com/crossbario/autobahn-js/issues/128
      test: /autobahn\/package.json$/,
      loader: 'raw-loader'
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
    }
  ];
};

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings

  module: {
    loaders: [
      autoBahnLoaders(),

      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel',
        exclude: /node_modules/,
        query: options.babelQuery
      },
      {
        // Transform our own .css files with PostCSS and CSS-modules
        test: /\.css$/,
        exclude: /node_modules/,
        loader: options.cssLoaders
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: options.cssLoaders
      },

      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.less$/, loader: "style!css!less"},

      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader' },

      { test: /\.(jpg|png|gif)$/, loaders: [
          'file-loader',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      { test: /\.jpe?g$|\.gif$|\.png$/i, loader: 'null-loader'},

      // sinon.js--aliased for enzyme--expects/requires global vars.
      // imports-loader allows for global vars to be injected into the module.
      // See https://github.com/webpack/webpack/issues/304
      { test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false',
      }

    ],
    noParse: ['ws', /node_modules\/when\/dist/]
  },

  externals: ['ws'],

  plugins: options.plugins.concat([
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
  progress: true
});
