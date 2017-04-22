-- CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  message TEXT NOT NULL,
  user INTEGER, 
  room INTEGER,
  FOREIGN KEY(user) REFERENCES users(id),
  FOREIGN KEY(room) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE usersRooms (
  user INTEGER, 
  room INTEGER,
  FOREIGN KEY(user) REFERENCES users(id),
  FOREIGN KEY(room) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

