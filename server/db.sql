create datebase comments;
use comments;

CREATE TABLE comments (
    id int PRIMARY KEY,
    comment VARCHAR(800) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into comments (comment) values ('tasts good.')