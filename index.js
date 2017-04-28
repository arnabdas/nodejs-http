var http = require('http');
var url = require('url');
var utils = require('util');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  var path = url.parse(req.url).pathname;

  if (path.indexOf('posts') > 0) {
    http.get({
      hostname: 'localhost',
      port: 3000,
      path: '/posts/1',
      agent: false  // create a new agent just for this one request
    }, (response) => {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        console.log(str);
        res.write(JSON.stringify({
          status: 'ok',
          result: {
            posts: JSON.parse(str)
          }
        }));
        res.end();
      });
    });
  }
});

server.listen(8097);