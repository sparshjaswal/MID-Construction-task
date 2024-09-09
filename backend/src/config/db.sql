CREATE DATABASE tasks_db;
USE tasks_db;
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT
);
