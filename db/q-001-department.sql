USE _20210701_business_db;

CREATE TABLE department(
  dep_id  INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (dep_id)
);

INSERT INTO department (dep_name)
VALUES ("General")