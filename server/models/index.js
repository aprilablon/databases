var db = require('../db/index.js');
var express = require('express');
var mysql = require('mysql');

db.connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected, Yay!");
  } else {
    console.log("Error connecting database :(");
  }
});

module.exports = {
  messages: {
    get: function(callback) {
      console.log('querying messages from DB');
      db.connection.query(`select * from messages m join users u on m.user = u.id join rooms r on m.room = r.id`, function(err, rows, fields) {
        if (!err) {
          console.log('The solution is: ', rows);
          callback(err, rows);
        } else {
          console.log('Error in writing to database');
        }
      });
    }, 
    post: function (message) {
      console.log('model POST function: ', message.username);
      db.connection.query(`INSERT IGNORE INTO users (username) VALUE ("${message.username}")`, function(err, rows, fields) {
        if (!err) {
          console.log('The solution is - USERNAME: ', rows);
        } else {
          console.log('Error in writing to database - USERNAME: ', err);
        }
      });
      
      var room = message.roomname || '';

      db.connection.query(`INSERT IGNORE INTO rooms (roomname) VALUE ("${room}")`, function(err, rows, fields) {
        if (!err) {
          console.log('The solution is - ROOM: ', rows);
        } else {
          console.log('Error in writing to database - ROOM: ', err);
        }
      });


      db.connection.query(`INSERT INTO messages (message, user, room) VALUES ("${message.message}", (SELECT id FROM users WHERE username = "${message.username}"), (SELECT id FROM rooms WHERE roomname = "${message.roomname}"))`, function(err, rows, fields) {
        if (!err) {
          console.log('The solution is - MESSAGES: ', rows);
        } else {
          console.log('Error in writing to database - MESSAGES: ', err);
        }
      });
    } 
  },

  users: {
    get: function (callback) {
      db.connection.query(`SELECT * FROM users`, function(err, rows, fields) {
        if (!err) {
          console.log('The solution is: ', rows);
          callback(null, rows);
        } else {
          console.log('Error in writing to database');
          callback(err, null);
        }
      });
    },
    post: function (message) {
      console.log("Helloo: ", message);
      db.connection.query(`INSERT IGNORE INTO users (username) VALUE ("${message.username}")`, function(err, rows, fields) {
        if (!err) {
          console.log('The solution is POST: ', rows);
        } else {
          console.log('Error in writing to database - POST');
        }
      });
    }
  }
};

