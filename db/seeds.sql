INSERT INTO departments (name)
VALUES
('Marketing'),
('Finances'),
('Sales'),
('Engineering'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Marketing Lead', 150000, 1),
('Marketing consultant', 120000, 1),
('Finances Lead', 150000, 2),
('Finances Analyst', 110000, 2),
('Sales Lead', 150000, 3),
('Saler', 100000, 3),
('Engineering Lead', 180000, 4),
('Software Engineer', 160000, 4),
('Legal Lead', 180000, 5),
('Lawyer', 160000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('George', 'Meredith', 1, NULL),
('Margaret', 'Oliphant', 2, 1),
('Anthony', 'Trollope', 2, 1),
('Charlotte', 'Yonge', 3, NULL),
('Horace', 'Walpole', 4, 4),
('Matthew', 'Lewis', 4, 4),
('William', 'Bedford', 5, NULL),
('Anne', 'Radcliffe', 6, 7),
('Charles', 'Brown', 6, 7),
('Eliza', 'Parsons', 7, NULL),
('Susan', 'Hill', 8, 10),
('Sydney', 'Owenson', 8, 10),
('Hubert', 'Crackanthorpe', 9, NULL),
('William', 'Carleton', 10, 13),
('Gerald', 'Griffin', 10, 13);





