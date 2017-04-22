CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL
);

ALTER TABLE users ADD UNIQUE (username);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  roomname VARCHAR(20) NOT NULL
);

ALTER TABLE rooms ADD UNIQUE (roomname);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  message TEXT NOT NULL,
  user INTEGER, 
  room INTEGER,
  FOREIGN KEY(user) REFERENCES users(id),
  FOREIGN KEY(room) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

