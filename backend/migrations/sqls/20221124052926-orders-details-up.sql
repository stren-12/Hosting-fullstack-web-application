/* To avoid conflicts */
DROP TABLE IF EXISTS orders_details;


CREATE TABLE orders_details(id SERIAL PRIMARY KEY, order_id INT, product_id INT, quantity INT,
CONSTRAINT fk_order_id
FOREIGN KEY(order_id)   
REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_product_id 
FOREIGN KEY(product_id)   
REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);