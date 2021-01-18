-- Create database "employee_db" (only works on local connections)
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use the DB employee_db for the rest of the script
USE employee_db;

-- Created table "department"
CREATE TABLE department (
    id int(2) AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

-- Created table "role"
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2),
    department_id int, 
	PRIMARY KEY (id)
)

-- Created table "employee"
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
	PRIMARY KEY(id)
)