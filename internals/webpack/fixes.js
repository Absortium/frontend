exports.autoBahnFix = function () {
  return [
    {
      // Fix issue with autobahn https://github.com/crossbario/autobahn-js/issues/128
      test: /autobahn\/package.json$/,
      loader: 'raw-loader'
    }
  ];
};

exports.authLockFix = function () {
  return [
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