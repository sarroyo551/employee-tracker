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

function addRole () {
    const departmentQuery = `SELECT * FROM department;`
    db.query(departmentQuery, (err, res) => {
        if(err) {
            console.log(err)
            return
        } 
        const departmentChoice = res.map(deparment => {
            return `${deparment.id} - ${deparment.name}`
        })
        const roleQuestions = [ 
            {
                type: 'input',
                name: 'role_name',
                message: 'What is the title for this role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department is this role in?',
                choices: departmentChoice
            }
        ]
        inquirer.prompt(roleQuestions)
        .then( (answers) => {
            console.log(answers)
            const queryString = `INSERT INTO role (title, salary, department_id)
            VALUES ('${answers.role_name}', ${Number(answers.salary)}, ${Number(answers.department[0])});`
            db.query(queryString, (err, res) => {
               if (err) {
                    return  console.log(err)
               } 
               console.log('role added')  
               init()
            })
        })
        // console.log(departmentChoice)
    })
}
function addEmployee () {
    const roleQuery = `SELECT * FROM role;`
    db.query(roleQuery, (err, res) => {
        if(err) {
            console.log(err)
            return
    }   
    const roleChoices = res.map(role => {
        return `${role.id} - ${role.title}`
    })

    const employeeQue = [{
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?'
    },
    {
        type: 'list',
        name: 'role_id',
        message: 'What is the employees role?',
        choices: roleChoices
    }
]
    inquirer.prompt(employeeQue) 
        .then( (answers) => {
            console.log(answers)
            const employeeQuery = `INSERT INTO employee (first_name, last_name, role_id)
            VALUES ('${answers.first_name}', '${answers.last_name}', ${Number(answers.role_id[0])})`
            db.query(employeeQuery, (err, res) => {
                if (err) {
                     return  console.log(err)
                } 
                console.log('employee added')  
                init()
             })
        })
}) //input field for first name
    //input field for last name
    //input role id
    //input manager id if available
}
function updateEmployee () {}
init()
//add a role
//add inquirer prompt -ask these questions-
//what is the title for this role?
//what is the salary for ths role?
//what is the department this role belongs to?