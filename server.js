'use strict';
// var Hapi = require('hapi');
// const express = require('express');
// const app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server, { wsEngine: 'ws' });
// app.set('port', 8054);

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 8060;


var redisClient = require('redis-connection')();
// var handleError = require('hapi-error').handleError;
// var server = new Hapi.Server();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/client/login.html')
});

app.get('/contacts', function (req, res) {
  res.sendFile(__dirname + '/contacts.html')
});

app.get('/chat', function (req, res) {
  return res.sendFile(__dirname + '/index.html')
});

app.get('/login.js', function (req, res) {
  res.sendFile(__dirname + '/src/client/login.js')
});

app.get('/client.js', function (req, res) {
  res.sendFile(__dirname + '/lib/client.js')
});

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/style.css')
});

app.get('/load', function (req, res) {
  redisClient.lrange(req.query.channelName, 0, -1, function (error, data) {
    // handleError(error, error);

   res.send(data);
 });
});


http.listen(port, function () {
  require('./src/socket/index.js').init(io, function () {
    console.log(
      'Feeling Chatty?',
      'listening on: http://192.168.0.171:8060'
    );
  });
});

// server.connection({
//   host: '192.168.112.65',
//   port: '8054',
// });

// function handleRedirect(req, res) {
//   debugger;
//   // res.redirect(req.originalUrl);
// }


// app.get('*', handleRedirect);

// server.register([require('inert'), require('hapi-error')], function() {
//   server.route([
//     { method: 'GET', path: '/', handler: { file: './src/client/login.html' } },
//     { method: 'GET', path: '/contacts', handler: { file: 'contacts.html' } },
//      { method: 'GET', path: '/chat', handler: { file: 'index.html' } },
//     // switch these two routes for a /static handler?
//     { method: 'GET', path: '/login.js', handler: { file: './src/client/login.js' } },
//     { method: 'GET', path: '/client.js', handler: { file: './lib/client.js' } },
//     { method: 'GET', path: '/style.css', handler: { file: './style.css' } },
//     {
//       method: 'GET',
//       path: '/load',
//       handler: require('./lib/load_messages').load,
//     },
//     {
//       method: 'GET',
//       path: '/elm',
//       handler: {
//         file: './elm/index.html',
//       },
//     },
//     {
//       method: 'GET',
//       path: '/js/app.js',
//       handler: {
//         file: './elm/js/app.js',
//       },
//     },
//     {
//       method: 'GET',
//       path: '/js/javascript.js',
//       handler: {
//         file: './elm/js/javascript.js',
//       },
//     },
//   ]);

//   server.listen(app.get('port'), function () {
//     console.log('----- SERVER STARTED -----');
// });
//   // server.start(function() {
//   //   require('./src/socket/index.js').init(server.listener, function() {
//   //     // console.log('REDISCLOUD_URL:', process.env.REDISCLOUD_URL);
//   //     console.log(
//   //       'Feeling Chatty?',
//   //       'listening on: http://192.168.112.65:8054'
//   //     );
//   //   });
//   // });
// });

module.exports = server;
