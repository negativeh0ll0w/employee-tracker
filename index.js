const db = require('./db/connection');
const inquirer = require('inquirer');
const console = require('console.table');

const useDB = () => { 
    inquirer.prompt([
        {
            type: 'list',
            name: 'initialQuery',
            message: 'Choose an option',
            choices: ['View Employees', 'View Departments', 'View Roles', 'Update Employee Role', 'Add New Role', 'Add New Employee', 'Add New Department', 'Quit']
        }
    ]).then((choice) => {
        switch(choice.initialQuery) {
            case 'View Employees':
                viewEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Add New Employee':
                addEmployee();
                break;
            case 'Add New Role':
                addRole();
                break;
            case 'Add New Department':
                addDepartment();
                break;
            case 'Quit':
                console.log('Goodbye')
                process.exit(1);
        };
    });
};

// view
const viewDepartments = function() {
    db.query('SELECT * FROM department', (err, result) => {
        console.table(['ID', 'Name', 'Manager'], result);
        useDB();
    });
};

const viewRoles = function() {
    const sql = `SELECT role.id, role.title, role.salary, department.name 
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, result) => {
        console.table(['ID', 'Title', 'Salary', 'Department', 'Manager'], result);
        useDB();
    });
};

const viewEmployees = function() {
    const sql = `SELECT employee.id, 
                    employee.first_name, 
                    employee.last_name, 
                    role.title AS title, 
                    department.name AS department,
                    role.salary, 
                    CONCAT (manager.first_name, ' ', manager.last_name) AS manager  
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`
    db.query(sql, (err, result) => {
        console.table(['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'], result);
        useDB();
    });
};

// update
const updateEmployeeRole = function() {
    const sql = "SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) AS employee FROM employee";
    db.query(sql, (err, results) => {
        if (err) throw err;
        const employees = results.map(([ id, employee ]) => ({ name: employee, value: id }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Employee to update: ',
                choices: employees
            }
        ]).then(data => {
            const id = data.employee;
            const sql = 'SELECT role.id, role.title, role.department FROM role';
            db.query(sql, (err, result) => {
                if (err) throw err;
                const roles = result.map(([ id, title ]) => ({ name: title, value: id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'New role: ',
                        choices: roles
                    }
                ]).then(data => {
                    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                    const param = [data.role, id];
                    db.query(sql, param, (err, result) => {
                        if (err) throw err;
                        useDB();
                    });
                });
            });
        });
    });
};

// add
const addEmployee = function() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'first',
        message: "First name: ",
        validate: Input => {
            if (Input) {
                return true;
            } else {
                console.log("error - required: first name")
            }
        }
    },
    {
        type: 'input',
        name: 'last',
        message: "Last name: ",
        validate: Input => {
            if (Input) {
                return true;
            } else {
                console.log("error - required: last name")
            }
        }
    }
]).then(data => {
        const params = [data.first, data.last];
        const sql = `SELECT role.id, role.title, role.department FROM role`;
        db.query(sql, (err, result) => {
            if (err) {throw err};
            const roles = result.map(([ id, title ]) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "Employee role:",
                    choices: roles
                }
            ])
            .then(data => {
                params.push(data.role, data.department);
                
                const sql = `SELECT employee.id, CONCAT (employee.first_name, ' ', employee.last_name) AS employee FROM employee`
                // TODO: update manager automatically based on role/departnment
            });
        });
    });
};

const addRole = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Role title: ',
            validate: input => {
                if (!input) {
                    console.log('error - required: role title')
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Salary: ',
            validate: input => {
                if (!input) {
                    console.log('error - required:  salary')
                    return false;
                }
                return true;
            }
        }
    ])
    .then(data => {
        const params = [data.name, data.salary];

        const sql = `SELECT department.id, department.name FROM department`;
        db.query(sql, (err, result) => {
            if (err) {throw err};

            const departments = result.map(([ id, name ]) => ({ name: name, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Choose department: ',
                    choices: departments
                },
                {
                    type: 'confirm',
                    name: 'is_manager',
                    message: 'Is this a management role?'
                }
            ])
            .then(data => {
                params.push(data.department);
                params.push(data.is_manager);
                const sql = `INSERT INTO role (title, salary, department_id, is_manager) VALUES (?,?,?,?)`;
                db.query(sql, params, (err, result) => {
                    if (err) {throw err};

                    useDB();
                })
            })
        })
    })
};

const addDepartment = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'New department: ',
            validate: data => {
                if (!data) {
                    console.log('error - required: department name');
                    return false;
                }
                return true;
            }
        }
    ]).then(input => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const param = input.department;
        db.query(sql, param, (err, result) => {
            if (err) throw err;
            useDB();
        });
    });
};

// start db on load 
useDB();


// module.exports ??