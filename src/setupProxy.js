// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/API',
        createProxyMiddleware({
            target: 'https://keepnotes-backend-sandy.vercel.app',
            changeOrigin: true,
        })
    );
};