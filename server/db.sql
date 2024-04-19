create datebase comments;
use comments;

CREATE TABLE comments (
    id int PRIMARY KEY,
    comment VARCHAR(800) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into comments (comment) values ('tasts good.')


UPDATE post AS p
SET comment_num = subquery.comment_num
FROM (
    SELECT post_id, COUNT(comment) AS comment_num
    FROM comments
    GROUP BY post_id
) AS subquery
WHERE p.post_id = subquery.post_id;