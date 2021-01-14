-- Create database "employee_db" (only works on local connections)
CREATE DATABASE employee_db;

-- Use the DB employee_db for the rest of the script
USE employee_db;

-- Created table "department"
CREATE TABLE department 
(
    id int AUTO_INCREMENT NOT NULL,
    name varchar(30) NOT NULL,
    PRIMARY KEY(id)
);

-- Created table "role"
CREATE TABLE role 
(
    id int AUTO_INCREMENT NOT NULL,
    title varchar(30) NOT NULL,
    salary decimal NOT NULL,
    department_id int,
    PRIMARY KEY(id),
    CONSTRAINT fk_PerRole FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Created table "employee"
CREATE TABLE employee 
(
    id int AUTO_INCREMENT NOT NULL, 
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int,
    manager_id int,
    PRIMARY KEY(id),
    CONSTRAINT fk_PerEmployee FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_ManagerEmployee FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO 