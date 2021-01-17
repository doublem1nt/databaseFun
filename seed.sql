-- Create database "employee_db" (only works on local connections)
CREATE DATABASE employee_db;

-- Use the DB employee_db for the rest of the script
USE employee_db;

-- Created table "department"
CREATE TABLE department 
(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

-- Created table "role"
CREATE TABLE role 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2),
    -- Lines 21 & 22 are Foreign Key Defintion
    -- They are populated by which Department is applied to the role
    department_id int, 
    CONSTRAINT fk_PerRole FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Created table "employee"
CREATE TABLE employee 
(
    id int AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    -- Lines 33 to 36 are Foreign Key Defintions
    -- They are populated by which Department & Role is applied to the Employee
    role_id int,
    manager_id int,
    CONSTRAINT fk_PerEmployee FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_ManagerEmployee FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
