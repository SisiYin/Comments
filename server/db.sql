create datebase comments;
use comments;

CREATE TABLE comments (
    id int PRIMARY KEY,
    comment VARCHAR(800) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into comments (comment) values ('tasts good.')

-- 创建触发器函数
CREATE OR REPLACE FUNCTION update_comment_num()
RETURNS TRIGGER AS $$
BEGIN
    -- 计算帖子的评论数量并更新
    UPDATE post AS p
    SET comment_num = (
        SELECT COUNT(comment)
        FROM comment AS c
        WHERE c.post_id = p.post_id
    )
    WHERE p.post_id = NEW.post_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER comment_trigger
AFTER INSERT OR DELETE ON comment
FOR EACH ROW
EXECUTE FUNCTION update_comment_num();
