var db = require('../db/index.js');
var express = require('express');
var mysql = require('mysql');

// Do something with db;
db.connection.connect(function(err){
  if (!err) {
    console.log("Database is connected, Yay!");
  } else {
    console.log("Error connecting database :(");
  }
});

// request handler below

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function(callback) {
      console.log('querying messages from DB');
      db.connection.query(`select * from messages m join users u on m.user = u.id join rooms r on m.room = r.id`, function(err, rows, fields) {
        // db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
          callback(err, rows);
        } else {
          console.log('Error in writing to database');
        }
      });
    }, 
    // a function which can be used to insert a message into the database
    post: function (message) {
      // insert into users with username
      console.log('model POST function: ', message.username);
      db.connection.query(`INSERT IGNORE INTO users (username) VALUE ("${message.username}")`, function(err, rows, fields) {
        // db.connection.end();
        if (!err) {
          console.log('The solution is - USERNAME: ', rows);
        } else {
          console.log('Error in writing to database - USERNAME: ', err);
        }
      });
      
      // room = room || ''
      var room = message.roomname || '';

      // insert into rooms with roomname
      db.connection.query(`INSERT IGNORE INTO rooms (roomname) VALUE ("${room}")`, function(err, rows, fields) {
        // db.connection.end();
        if (!err) {
          console.log('The solution is - ROOM: ', rows);
        } else {
          console.log('Error in writing to database - ROOM: ', err);
        }
      });

      // insert into messages with text and user_id and room_id
      // INSERT INTO messages (message, user, room) VALUES ("${message.message}", (SELECT id FROM users WHERE name = "${message.username}"), (SELECT id FROM rooms WHERE name = "${message.roomname}"))
      db.connection.query(`INSERT INTO messages (message, user, room) VALUES ("${message.message}", (SELECT id FROM users WHERE username = "${message.username}"), (SELECT id FROM rooms WHERE roomname = "${message.roomname}"))`, function(err, rows, fields) {
        // db.connection.end();
        if (!err) {
          console.log('The solution is - MESSAGES: ', rows);
        } else {
          console.log('Error in writing to database - MESSAGES: ', err);
        }
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.connection.query(`SELECT * FROM users`, function(err, rows, fields) {
        // db.connection.end();
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
      // insert into users with username
      console.log("Helloo: ", message);
      db.connection.query(`INSERT IGNORE INTO users (username) VALUE ("${message.username}")`, function(err, rows, fields) {
        // db.connection.end();
        if (!err) {
          console.log('The solution is POST: ', rows);
        } else {
          console.log('Error in writing to database - POST');
        }
      });
    }
  }
};

