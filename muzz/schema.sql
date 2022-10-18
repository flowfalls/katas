CREATE TYPE gender AS ENUM (
  'male',
  'female'
);

CREATE TABLE users (
  id   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text    NOT NULL,
  gender    gender,
  age smallint,
  email text    NOT NULL UNIQUE,
  password text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp
  location smallint NOT NULL DEFAULT 0
);

CREATE TABLE swipe_history(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  triggering_user_id uuid NOT NULL REFERENCES users(id),
  receiving_user_id uuid NOT NULL REFERENCES users(id),
  action text NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE tags (
  id   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text    NOT NULL
);

CREATE TABLE user_tags (
  user_id uuid REFERENCES users(id),
  tag_id  uuid REFERENCES tags(id),
  PRIMARY KEY (user_id, tag_id)
);

CREATE TABLE profile_tags (
  profile_id uuid REFERENCES profiles(id),
  tag_id  uuid REFERENCES tags(id),
  PRIMARY KEY (profile_id, tag_id)
);

CREATE TABLE profiles (
  id   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId uuid REFERENCES users(id) ON DELETE CASCADE,
  bio text,
  created_at timestamp NOT NULL DEFAULT NOW(),
  updated_at timestamp,
  picture text
);
