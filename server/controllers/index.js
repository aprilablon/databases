var models = require('../models/index.js');
var fs = require('fs');
var path = require('path');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = {
  messages: {
    get: function (request, response) {
      console.log('messages GET request');
      response.set(defaultCorsHeaders);
      models.messages.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        } else {
          response.json(results);
        }
      });
    }, 
    post: function (request, response) {
      console.log('should be message POST object: ', request.body);
      models.messages.post(request.body);
      response.set(defaultCorsHeaders);
      response.sendStatus(201);
    },
    options: function(request, response) {
      response.set(defaultCorsHeaders);
      response.sendStatus(200);
    }
  },

  users: {
    get: function (request, response) {
      models.users.get(function(err, results) {
        if (err) {
          console.log('Error: ', err);
        } else {
          response.json(results);
        }
      });
    },
    post: function (request, response) {
      console.log('should be user POST object: ', request.body);
      models.users.post(request.body);
      response.set(defaultCorsHeaders);
      response.sendStatus(201);
    }
  }
};

