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
    get: function () {
      db.connection.query(`SELECT * FROM messages`, function(err, rows, fields) {
        db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
          return rows;
        } else {
          console.log('Error in writing to database');
        }
      });
    }, 
    // a function which can be used to insert a message into the database
    post: function (message) {
      // insert into users with username
      console.log('model POST function: ', message.username);
      db.connection.query(`INSERT INTO users (name) VALUE ("${message.username}")`, function(err, rows, fields) {
        db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
        } else {
          console.log('Error in writing to database - USERNAME');
        }
      });
      
      // room = room || ''
      var room = message.roomname || '';

      // insert into rooms with roomname
      db.connection.query(`INSERT INTO rooms (name) VALUE ("${room}")`, function(err, rows, fields) {
        db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
        } else {
          console.log('Error in writing to database - ROOM');
        }
      });

      // insert into messages with text and user_id and room_id
      db.connection.query(`INSERT INTO messages (message, user, room) VALUE ("${messages.text}", (SELECT id FROM users WHERE name = "${messages.username}"), (SELECT id FROM rooms WHERE name = "${messages.room}"))`, function(err, rows, fields) {
        db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
        } else {
          console.log('Error in writing to database - MESSAGES');
        }
      });

      // insert into usersRooms with user_id and room_id
      db.connection.query(`INSERT INTO usersRooms (user, room) VALUE ((SELECT id FROM users WHERE name = "${messages.username}"), (SELECT id FROM rooms WHERE name = "${messages.room}"))`, function(err, rows, fields) {
        db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
        } else {
          console.log('Error in writing to database - USERSROOMS');
        }
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.connection.query(`SELECT * FROM users`, function(err, rows, fields) {
        db.connection.end();
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
      console.log("Helloo: ", message.username);
      db.connection.query(`INSERT INTO users (name) VALUE ("${message.username}")`, function(err, rows, fields) {
        db.connection.end();
        if (!err) {
          console.log('The solution is: ', rows);
        } else {
          console.log('Error in writing to database - POST');
        }
      });
    }
  }
};

