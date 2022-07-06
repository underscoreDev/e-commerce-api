CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE ROLE AS ENUM ('admin', 'guest');

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR
);
