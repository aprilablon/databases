var models = require('../models/index.js');
// var express = require('express');
// var app = express();

// HEADERS HERE
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var data;

var callback = function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    data = data;
  }
};

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (request, response) {
      response.writeHead(200, defaultCorsHeaders);
      response.end(models.messages.get()); //READ in messages from DB

    }, 
    // a function which handles posting a message to the database
    post: function (request, response) {
      console.log('should be message POST object: ', request.body);
      models.messages.post(request.body);
      response.set(defaultCorsHeaders);
      response.send('?');
    } 
  },

  users: {
    // Ditto as above
    get: function (request, response) {

      response.send('GET request to the homepage');

    },
    post: function (request, response) {
      
      console.log('should be user POST object: ', request.body);
      
      models.users.post(request.body);

      response.set(defaultCorsHeaders);

      // models.users.get(callback);
      console.log('data', data);
      response.send(data);
    }
  }
};

