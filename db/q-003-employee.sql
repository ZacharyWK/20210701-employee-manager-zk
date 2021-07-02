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