

INSERT INTO department (name) 
VALUES 
    ('Engineering'),
    ('Accounting'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id, is_manager)
VALUES
    ('Lead Engineer', 150000, '1', 1),
    ('Engineer', 120000, '1', 0),
    ('Director of Finance', 450000, '2', 1),
    ('Accountant', 80000, '2', 0),
    ('Senior Attorney', 3000000, '3', 1),
    ('Junior Attorney', 190000, '3', 0),
    ('Sales Lead', 100000, '4', 1),
    ('Client Specialist', 60000, '4', 0);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES
    ('Tate', 'Jonathon', '1', null),
    ('Hobbs', 'Janiyah', '3', null),
    ('Edwards', 'Heidi', '5', null),
    ('Perkins', 'Cecelia', '7', null),
    ('Odom', 'Luka', '2', 1),
    ('McMahon', 'Gregory', '2', 1),
    ('Meza', 'Mauricio', '4', 2),
    ('McBride', 'Jayla', '6', 3),
    ('Applebaum', 'Laurence', '8', 4),
    ('Atkins', 'Terrence', '8', 4);