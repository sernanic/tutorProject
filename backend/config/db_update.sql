-- create Database for project
CREATE DATABASE tutorProject;
USE tutorProject;

-- create users table and fake data for users table

CREATE TABLE `users` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `userName` varchar(255) default NULL,
  `userEmail` varchar(255) default NULL,
  `userPassword` varchar(255),
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

INSERT INTO `users` (`userName`,`userEmail`,`userPassword`)
VALUES
  ("Timothy Rojas","molestie.tellus.aenean@protonmail.net","YHL72OMH7SX"),
  ("Bernard Merritt","pede@outlook.com","YMF12YKG7DH"),
  ("Ashton Ryan","mauris.eu@google.com","UYC15RDW2CM"),
  ("Ali Boyer","augue@google.couk","PCX75RSK2JB"),
  ("Lewis Poole","id.mollis@yahoo.couk","XCD91QHQ5SW");



CREATE TABLE `Student` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `studetnName` varchar(255) default NULL,
  `studentEmail` varchar(255) default NULL,
  `studentPassword` varchar(255),
  `parentId` mediumint default NULL,
  `isAdult` varchar(255) default NULL,
  `age` mediumint default NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;
