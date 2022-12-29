/* Like what cpanel did on backup it's better to split the data than the schema  */

INSERT INTO users(username ,first_name ,last_name , password_digest) VALUES 
('sultan', 'Sultan' ,'Aljohani' ,'$2b$10$OA56HbEvj/mYgsmzKZ2One7Fa7xFZVm3MWCs8CntYYoqaxfj3nDhO'),
('jomer','Jamal'    ,'Omer'     ,'$2b$10$ycpHQi/WZhm8xG4Z.eXAQunOJX.nAA2Ku8Ffxl6YTRnEMkeBaJ33y'),
('john_the_ripper'  ,'John'   ,'Mick' ,'$2b$10$/omNddL9EXef5UvSInTJ5Oje.BZmHrv8PaPUGz2QrtHt8k.c/JLyS');


/*
NOTE: John the Ripper is password cracker software see https://www.openwall.com/john/
*/
INSERT INTO categories(name) VALUES 
('Phones'),
('Laptop'),
('PC');
COMMIT;

INSERT INTO products(name, price ,category_id) VALUES
('Google Pixel 6' ,2650, 1),
('Samsung S22', 2700, 1),
('Think Pad', 4000, 2),
('Apple Macbook Air', 6000,2),
('Asus gaming PC', 7300,3),
('Dell OptiPlex', 2000,3);

INSERT INTO orders(user_id, status) VALUES
(1,'complete'),
(2,'complete'),
(2,'active'),
(3,'complete');

INSERT INTO orders_details(order_id, product_id , quantity) VALUES 
(1,1,2),
(1,6,1),
(2,2,1),
(3,5,1),
(3,6,2),
(4,3,1),
(4,4,1);

