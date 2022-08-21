const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};


function apiHandler (request, response) {
  if (request.method === 'GET') {
    response.writeHead(200, mimeTypes['.json']);
    response.end(JSON.stringify({
      test: 'hello world'
    }, 'utf-8'));
  } else {
    console.log(request.body);
    response.writeHead(200, mimeTypes['.json']);
    response.end(JSON.stringify({
      test: 'hello world'
    }, 'utf-8'));
  }
}

http.createServer(function (request, response) {
  console.log('request ', request.url);
  console.log('request ', request.headers['content-type']);

  if (request.headers['content-type'] === 'application/json') {
    apiHandler(request, response);
    return
  }

  let filePath = './src' + request.url;
  if (filePath == './src/') {
    filePath = './src/index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  console.log('Extension ===>', extname);

  let contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./src/404.html', function (error, content) {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          console.log(content);
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
