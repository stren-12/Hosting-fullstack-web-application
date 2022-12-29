/* To avoid conflicts */
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(255));