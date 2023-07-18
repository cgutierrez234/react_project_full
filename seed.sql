DROP TABLE IF EXISTS tasks; 

CREATE TABLE tasks(
    id serial PRIMARY KEY,
    task varchar(50)
);

INSERT INTO tasks(task) VALUES ('Feed the fish');
INSERT INTO tasks(task) VALUES ('Walk my hotdog');
INSERT INTO tasks(task) VALUES ('Get down with the sickness');
INSERT INTO tasks(task) VALUES ('Party hardy');
INSERT INTO tasks(task) VALUES ('Shaka my kahn');
INSERT INTO tasks(task) VALUES ('Seed the database');
INSERT INTO tasks(task) VALUES ('Write zingers for class');
INSERT INTO tasks(task) VALUES ('Make humble pie');
INSERT INTO tasks(task) VALUES ('Gas up my dog');
INSERT INTO tasks(task) VALUES ('Fold all my money');