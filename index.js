const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config')
const questions = [
    {
        type: 'list',
        message: 'What do you want to do next?',
        name: 'option',
        choices: ['view all departments', 'view all roles',  'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'finished']
    }
] 

function init () {
    inquirer.prompt(questions)
        .then( (answers) => {
            // console.log(answers)
            if (answers.option == 'view all departments') {
                console.log('viewDepartments')
                viewDepartments()
            } else if (answers.option == 'view all roles') {
                viewRoles()
            } else if (answers.option == 'view all employees') {
                viewEmployees()
            } else if (answers.option == 'add a department') {
                addDepartment()
            } else if (answers.option == 'add a role') {
                addRole()
            } else if (answers.option == 'add an employee') {
                addEmployee()
            } else if (answers.option == 'update employee role') {
                updateEmployee()
            } else {
                //finished
            }
        })
}


function viewDepartments () {
    const queryString = 'SELECT * FROM department;';
    db.query(queryString, (err, result, field) => {
        if (err) {
            console.log(err)
            return
        }
        console.table(result)
        init()
    })
}
function viewRoles () {
    const queryString = `SELECT role.id, role.title, role.salary, department.name as department 
    FROM role
    INNER JOIN department ON role.department_id = department.id;`;
    db.query(queryString, (err, result, field) => {
        if (err) {
            console.log(err)
            return
        }
        console.table(result)
        init()
    })
}
function viewEmployees () {
    const queryString = `SELECT employee.id, employee.first_name, employee.last_name, role.title as role, role.salary, department.name as department
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;`;
    db.query(queryString, (err, result, field) => {
        if (err) {
            console.log(err)
            return
        }
        console.table(result)
        init()
    })
}
function addDepartment () {
    const departmentQues = [
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department'
        }
    ]
    inquirer.prompt(departmentQues)
        .then( (answers) => {
            console.log(answers)
            const queryString = `INSERT INTO department (name) VALUES ('${answers.department_name}');`
            db.query(queryString, (err, result, field) => {
                if (err) {
                    console.log(err)
                    return
                }
                init()
            })
        })
}

function addRole () {}
function addEmployee () {}
function updateEmployee () {}
init()