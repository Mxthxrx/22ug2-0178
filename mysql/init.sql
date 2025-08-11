CREATE DATABASE IF NOT EXISTS bankdb;
USE bankdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    balance DECIMAL(10,2),
    type ENUM('current', 'savings'),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password) VALUES ('john', '1234');

INSERT INTO accounts (user_id, name, balance, type) VALUES
(1, 'Main Current Account', 1500.50, 'current'),
(1, 'Business Current Account', 3500.00, 'current'),
(1, 'Personal Savings', 5000.00, 'savings'),
(1, 'Emergency Fund', 2500.00, 'savings');
