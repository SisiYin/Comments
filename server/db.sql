

INSERT INTO comment (comment_id, account_id, post_id, comment ,date) 
VALUES 
    (1, 1,1, 'good' ,'2024-03-20 10:00:00'::timestamp with time zone),
    (2, 1, 2 , 'easy' ,'2024-03-21 11:00:00'::timestamp with time zone),
    (3, 3, 5 , 'sweet' ,'2024-03-25 12:00:00'::timestamp with time zone),
    (4, 2, 1 , 'very good' ,'2024-03-25 13:00:00'::timestamp with time zone),
    (5, 3, 3 , 'very spicy' ,'2024-03-31 11:00:00'::timestamp with time zone),
    (6, 2, 2 , 'very good' ,'2024-04-15 13:00:00'::timestamp with time zone),
    (7, 4, 5 , 'good' ,'2024-04-19 13:00:00'::timestamp with time zone),
    (8, 4, 4 , 'good' ,'2024-04-19 17:00:00'::timestamp with time zone),
    (9, 5, 5 , 'normal' ,'2024-04-20 11:00:00'::timestamp with time zone),
    (10, 5, 3 , 'hard' ,'2024-04-20 11:55:00'::timestamp with time zone)

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
