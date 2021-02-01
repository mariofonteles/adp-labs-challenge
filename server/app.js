const http = require('http');
const chalk = require('chalk');
const router = require('./router');

const server = http.createServer((req, res) => {
  // sets necessary headers
  res.setHeader('content-Type', 'Application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // in a real project, allowed origin would be specific and not general
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Max-Age', '2592000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  // to avoid CORS issues
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  // preparing HTTP body stream before sending it to router
  if (req.method === 'POST' || req.method === 'PUT') {
    req.body = '';
    req.on('data', (chunk) => {
      req.body += chunk;
    });
    req.on('end', () => {
      router.dispatch(req, res, (err) => {
        if (err) {
          res.writeHead(404);
          res.end();
        }
      });
    });
  } else {
    router.dispatch(req, res, (err) => {
      if (err) {
        res.writeHead(404);
        res.end();
      }
    });
  }
});

server.listen(8000);
console.log(chalk.green('server listening at port 8000'));
