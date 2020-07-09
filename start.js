const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

const listen_port = 3000
const react_port = 8001
const symfony_port = 8000

console.log(`[HPM] \x1b[33mApp Dev Server\x1b[0m will be reachable at http://localhost:${listen_port}`)
console.log(`[HPM] \x1b[33mReact Dev Server\x1b[0m will be reachable at http://localhost:${react_port}`)
console.log(`[HPM] \x1b[33mSymfony Dev Server\x1b[0m will be reachable at http://localhost:${symfony_port}`)

// proxy middleware options
const symfonyOptions = {
  target: 'http://localhost:' + symfony_port + '/',
  changeOrigin: true,
  pathRewrite: {'^/api': ''}
};

const reactOptions = {
  target: 'http://localhost:' + react_port + '/',
  ws: true, // proxy websockets
  changeOrigin: true
}

// create the proxy (without context)
const symfonyProxy = createProxyMiddleware(symfonyOptions);
const reactProxy = createProxyMiddleware(reactOptions);

// mount `Proxies` in web server
const app = express();
app.use('/api', symfonyProxy);
app.use('/', reactProxy);
app.listen(listen_port);
