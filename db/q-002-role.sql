USE _20210701_business_db;

CREATE TABLE employee_role(
  rol_id INT NOT NULL AUTO_INCREMENT,
  rol_title VARCHAR(50) NOT NULL,
  rol_salary DECIMAL default 0.00,
  dep_id INT default 0,
  PRIMARY KEY (rol_id)
);

INSERT INTO employee_role (rol_title, rol_salary, dep_id)
VALUES ("Manager", 100000.00, 1)