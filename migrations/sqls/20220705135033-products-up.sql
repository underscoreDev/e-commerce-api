CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE CATEGORY AS ENUM ('earphones', 'speakers', 'headsets');

CREATE TABLE products (
    product_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    product_name VARCHAR(100),
    price INTEGER,
    category CATEGORY
);