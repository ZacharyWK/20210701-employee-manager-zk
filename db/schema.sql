CREATE DATABASE _20210701_business_db;

USE _20210701_business_db;

CREATE TABLE employee(
  emp_id INT NOT NULL AUTO_INCREMENT,
  emp_first_name VARCHAR(45) NOT NULL,
  emp_last_name VARCHAR(45) NOT NULL,
  rol_id INT default 0,
  emp_manager_id INT default 0,
  PRIMARY KEY (emp_id)
);

INSERT INTO employee (emp_first_name, emp_last_name, rol_id, emp_manager_id)
VALUES ("No","Body", 1, 1)

CREATE TABLE employee_role(
  rol_id INT NOT NULL AUTO_INCREMENT,
  rol_title VARCHAR(50) NOT NULL,
  rol_salary DECIMAL default 0.00,
  dep_id INT default 0,
  PRIMARY KEY (rol_id)
);

INSERT INTO employee_role (rol_title, rol_salary, dep_id)
VALUES ("Manager", 100000.00, 1)


CREATE TABLE department(
  dep_id  INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (dep_id)
);

INSERT INTO department (dep_name)
VALUES ("General")