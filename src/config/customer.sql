CREATE TABLE IF NOT EXISTS `customers` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    active BOOLEAN DEFAULT false
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;