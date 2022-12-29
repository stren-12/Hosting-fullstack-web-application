/* To avoid conflicts */
DROP TABLE IF EXISTS users;

/*
 Postgresql sensitivity is wired, Hence we add underscore ruthar than camelCase
 see: https://dev.to/lefebvre/dont-get-bit-by-postgresql-case-sensitivity--457i
 And: https://dba.stackexchange.com/questions/250943/should-i-not-use-camelcase-in-my-column-names
*/
CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), password_digest VARCHAR(255));