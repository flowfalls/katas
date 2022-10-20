-- +goose Up
-- +goose StatementBegin

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE gender AS ENUM (
  'male',
  'female'
);


DROP TABLE IF EXISTS user_tags;
DROP TABLE IF EXISTS profile_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS swipe_history;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

-- +goose Up
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name text    NOT NULL,
  gender    gender NOT NULL,
  age int NOT NULL,
  email text    NOT NULL UNIQUE,
  password text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  location int NOT NULL DEFAULT 0
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  userId integer REFERENCES users(id) ON DELETE CASCADE,
  bio text,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  picture text
);

-- +goose Up
CREATE TABLE swipe_history(
  id SERIAL PRIMARY KEY,
  triggering_user_id integer NOT NULL REFERENCES users(id),
  profile_id integer NOT NULL REFERENCES profiles(id),
  rejected boolean NOT NULL DEFAULT FALSE,
  created_at timestamp NOT NULL DEFAULT NOW()
);


-- +goose Up
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name text    NOT NULL
);
-- +goose Up
CREATE TABLE user_tags (
  user_id integer REFERENCES users(id),
  tag_id  integer REFERENCES tags(id),
  PRIMARY KEY (user_id, tag_id)
);

-- +goose Up
CREATE TABLE profile_tags (
  profile_id integer REFERENCES profiles(id),
  tag_id  integer REFERENCES tags(id),
  PRIMARY KEY (profile_id, tag_id)
);
-- +goose StatementEnd

INSERT into tags ( name ) VALUES ( 'sports' );
INSERT into tags ( name ) VALUES ( 'shahada' );
INSERT into tags ( name ) VALUES ( 'travelling' );
INSERT into tags ( name ) VALUES ( 'family' );
INSERT into tags ( name ) VALUES ( 'music' );

INSERT INTO users (name, gender, age, email, password, created_at, location) VALUES ('nello', 'male', 22, 'john.doe@sd.com', '123456', '2020-01-01 00:00:00', 0);
INSERT INTO users (name, gender, age, email, password, created_at, location) VALUES ('shab', 'male', 22, 'shab.doe@sd.com', '123456', '2020-01-01 00:00:00', 0);
INSERT INTO users (name, gender, age, email, password, created_at, location) VALUES ('sarah', 'female', 22, 'sarah.ben@sd.com', '123456', '2020-01-01 00:00:00', 1);
INSERT INTO users (name, gender, age, email, password, created_at, location) VALUES ('ben', 'male', 22, 'ben.doe@sd.com', '123456', '2020-01-01 00:00:00', 3);

insert into user_tags (user_id, tag_id) values ('1', '1');
INSERT INTO user_tags (user_id, tag_id) VALUES ('2', '2');
INSERT INTO user_tags (user_id, tag_id) VALUES ('3', '3');
INSERT INTO user_tags (user_id, tag_id) VALUES ('4', '2');
INSERT INTO user_tags (user_id, tag_id) VALUES ('3', '2');

INSERT INTO profiles (userId, bio, picture) VALUES ('1', 'I am a very nice person', 'https://i.imgur.com/8Q5Z4Zm.jpg');
INSERT INTO profiles (userId, bio, picture) VALUES ('2', 'I like skydiving', 'https://i.imgur.com/8Q5Z4Zm.jpg');
INSERT INTO profiles (userId, bio, picture) VALUES ('3', 'dog walking together', 'https://i.imgur.com/8Q5Z4Zm.jpg');
INSERT INTO profiles (userId, bio, picture) VALUES ('4', 'Heavy metal please', 'https://i.imgur.com/8Q5Z4Zm.jpg');

INSERT INTO profile_tags (profile_id, tag_id) VALUES ('1', '1');
INSERT INTO profile_tags (profile_id, tag_id) VALUES ('2', '2');
INSERT INTO profile_tags (profile_id, tag_id) VALUES ('3', '3');
