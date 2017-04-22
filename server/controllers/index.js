var models = require('../models/index.js');
var fs = require('fs');
var path = require('path');
// var express = require('express');
// var app = express();

// HEADERS HERE
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var callback = function(err, data) {
  console.log('in callback');
  if (err) {
    console.log("Error", err);
  } else {
    console.log('callback success: ', data);
    var dataFile = fs.readFileSync(path.join(__dirname, 'data.json'));
    dataFile = JSON.parse(dataFile);
    console.log('parsed data file: ', dataFile);
    dataFile.results.unshift(data[0]);
    // _.flatten(dataFile.results);
    console.log('after unshifting: ', dataFile);
    dataFile = JSON.stringify(dataFile);
    fs.writeFileSync(path.join(__dirname, 'data.json'), dataFile);
  }
};


var readFile = function() {
  console.log('Reading file...');
  var dataFile = fs.readFileSync(path.join(__dirname, 'data.json'));
  dataFile = JSON.parse(dataFile);
  console.log('Data file: ', dataFile);
  return dataFile;
};

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (request, response) {
      console.log('messages GET request');
      response.set(defaultCorsHeaders);
      models.messages.get(callback);

      models.messages.get(callback);
      var sendData = readFile();
      response.send(sendData); //READ in messages from DB
    }, 
    // a function which handles posting a message to the database
    post: function (request, response) {
      console.log('should be message POST object: ', request.body);
      models.messages.post(request.body);
      response.set(defaultCorsHeaders);
      var sendData = readFile();
      response.send(sendData);
    } 
  },

  users: {
    // Ditto as above
    get: function (request, response) {
      models.users.get(callback);
      var sendData = readFile();
      response.send(sendData);
    },
    post: function (request, response) {
      
      console.log('should be user POST object: ', request.body);
      
      models.users.post(request.body);

      response.set(defaultCorsHeaders);
      var sendData = readFile();
      response.send(sendData);
    }
  }
};

