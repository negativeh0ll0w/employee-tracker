

INSERT INTO department (name, manager_id) 
VALUES 
    ('Engineering', '1'),
    ('Accounting', '2'),
    ('Legal', '3'),
    ('Sales', '4');

INSERT INTO role (title, salary, department_id, is_manager)
VALUES
    ('Lead Engineer', 150000, '1'),
    ('Engineer', 120000, '1'),
    ('Director of Finance', 450000, '2'),
    ('Accountant', 80000, '2'),
    ('Senior Attorney', 3000000, '3'),
    ('Junior Attorney', 190000, '3'),
    ('Sales Lead', 100000, '4'),
    ('Client Specialist', 60000, '4');

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