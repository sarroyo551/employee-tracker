const inquirer = require('inquirer');
const questions = [
    {
        type: 'list',
        message: 'What do you want to do next?',
        name: 'option',
        choices: ['view all deparments', 'view all roles',  'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'finished']
    }
] 
const age = 21;
if (age === 21) {
    
}

function init () {
    inquirer.prompt(questions)
        .then( (answers) => {
            console.log(answers)
            if (answers.option == 'view all departments') {
                //show all departments
            } else if (answers.option == 'view all roles') {
                //show all roles
            } else if (answers.option == 'view all employees') {
                //show all employees
            } else if (answers.option == 'add a department') {
                //adds a department
            } else if (answers.option == 'add a role') {
                //adds a role
            } else if (answers.option == 'add an employee') {
                //adds an employee
            } else if (answers.option == 'update employee role') {
                //updates employee role 
            } else {
                //finished
            }
        })
}

init()