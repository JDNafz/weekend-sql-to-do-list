CREATE TABLE tasks (
  "id" serial PRIMARY KEY,
  "complete" boolean DEFAULT false,
  "task" varchar(50) NOT NULL
);

INSERT INTO tasks (task)
VALUES 
('Get groceries'),
('Walk the dog'),
('Make a plan to take over the world'),
('Thank Jessica for the flowers'),
('Turn in to a dolphin'),
('Bomb the russians');




