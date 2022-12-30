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

INSERT INTO products(name, price ,category_id,url,description) VALUES
('Book','9.99',1,'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','You can read it!'),
('Headphones','249.99',1,'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','Listen to stuff!'),
('Backpack','79.99',1,'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','Carry things around town!'),
('Glasses','129.99',2,'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','description Now you can see!'),
('name Cup','4.99',2,'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80','description Drink anything with it!'),
('name Shirt','29.99',3,'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80','description Wear it with style!');


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

