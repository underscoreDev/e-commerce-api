CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE ORDERSTATUS AS ENUM ('active', 'completed');

CREATE TABLE orders (
    order_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    quantity INTEGER,
    status ORDERSTATUS,
    user_id uuid REFERENCES users(user_id),
    product_id uuid REFERENCES products(product_id) UNIQUE NOT NULL
);
