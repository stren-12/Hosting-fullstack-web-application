# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
Note: args for [GET] is in the path segment (i.e /users/:user_id), where in the [POST] it's json post data (by using bodyParser.json())
#### Products
- An INDEX route: /products [GET]
- A SHOW route (show specific product data by product_id ): /products/:product_id [GET] (args: product_id (integer))
- A CREATE route (create a new product): /products/ [POST] (args: name (string), price (float), category_id (integer)) [token required]
- A SHOW route (show a products by thier category id): /products/by_category/:category_id [GET] Products by category (args: category_id (integer))

#### Users
- An INDEX route (return all users data): /users [GET] [token required]
- A SHOW route (show a specific user data by user_id): /users/:user_id [GET] (args: user_id (integer)) [token required]
- A CREATE route (create a new user and return the JWT): /users [POST] (args: username (string) , first_name (string), last_name (string), password (string)) [token required] 
- A CREATE route (authenticate user and return the JWT): /users/authenticate [POST] (args: username (string), password (string))
#### Orders
- A SHOW route (show current user orders): /orders/current_user_orders/:user_id [GET] (args: user_id (integer)) [token required]

## Data Shapes (table_name)
name: postgres_type(length if present)
#### Product (products)
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)
- price: DECIMAL(10,2)
- category_id: INT (forgien key to categories(id))


#### User (users)
- id: SERIAL PRIMARY KEY
- first_name: VARCHAR(255)
- last_name: VARCHAR(255)
- password_digest: VARCHAR(255)

#### Orders (orders)
- id: SERIAL PRIMARY KEY
- user_id: INT (forgien key to users(id))
- status VARCHAR(255) (active or complete)

Extra two table added (categories and orders_details) to normalize our database onto the third normal form (3NF)


### Category (categories)
- id: SERIAL PRIMARY KEY
- name: VARCHAR(255)

### Orders Details (orders_details)
- id: SERIAL PRIMARY KEY
- order_id: INT (forgien key to orders(id))
- product_id: INT  (forgien key to product(id))
- quantity: INT

