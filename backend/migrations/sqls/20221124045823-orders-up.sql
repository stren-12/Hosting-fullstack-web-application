/* To avoid conflicts */
DROP TABLE IF EXISTS orders;

CREATE TABLE orders(id SERIAL PRIMARY KEY, user_id INT, status VARCHAR(255),
CONSTRAINT fk_user_id 
FOREIGN KEY(user_id)   
REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);