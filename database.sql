CREATE TABLE tasks (
  "id" serial PRIMARY KEY,
  "complete" boolean DEFAULT false,
  "task" varchar(50) NOT NULL,
  "time" smallint
);

--max range for "time" is 0 (12:00am) to 1439 (11:59pm)"
INSERT INTO tasks ("task","complete", "time")
VALUES 
('Get groceries',true, 0),
('Walk the dog',true, 1439),  
('Make a plan to take over the world',true,300),
('Thank Jessica for the flowers',true, 500),
('Turn in to a dolphin',true, 800),
('Bomb the russians',true, 900);


SELECT * FROM tasks ORDER BY id;





