/* To avoid conflicts */
DROP TABLE IF EXISTS products;

CREATE TABLE products(id SERIAL PRIMARY KEY, name VARCHAR(255), price DECIMAL(10,2), category_id INT,url VARCHAR(1000),description VARCHAR(255),
CONSTRAINT fk_category_id 
FOREIGN KEY(category_id)   
REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);