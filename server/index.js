/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const ngrok = require('ngrok');
var proxy = require('http-proxy-middleware');

const frontend = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();


// Initialize frontend middleware that will serve your JS app
const webpackConfig = isDev
    ? require('../internals/webpack/webpack.dev.babel')
    : require('../internals/webpack/webpack.prod.babel');

app.use(['/api', '/notifications'], proxy({target: 'http://docker.backend:3000', changeOrigin: true}));
app.use(frontend(webpackConfig));


const port = process.env.PORT || 80;

// Start your app.
app.listen(port, (err) => {
    if (err) {
        return logger.error(err);
    }

    // Connect to ngrok in dev mode
    if (isDev) {
        ngrok.connect(port, (innerErr, url) => {
            if (innerErr) {
                return logger.error(innerErr);
            }

            logger.appStarted(port, url);
        });
    } else {
        logger.appStarted(port);
    }
});
