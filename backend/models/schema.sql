Create table achievements
(
    game_no INT,
    achievement_no INT,
    user_id varchar,


    CONSTRAINT COMP_KEY PRIMARY KEY (achievement_no, game_no, user_id)
    ------------ Composite key declaration--------
);