const inquirer = require('inquirer');
const questions = [
    {
        type: 'list',
        message: 'What do you want to do next?',
        name: 'option',
        choices: ['view all deparments', 'view all roles',  'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'finished']
    }
] 

function init () {
    inquirer.prompt(questions)
        .then( (answers) => {
            console.log(answers)
        })
}

init()