/* Handles inquirer queries and uses responses to make SQL queries to connection */
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection;

// initialize a connection var to db and begin the mainMenu prompt
const initPrompt = db => {
    connection = db;
    console.log("//////////////////////\n// EMPLOYEE TRACKER //\n//////////////////////");
    mainMenu();
};

// choose an action and call the corresponding member function
const mainMenu = () => {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View All Departments", "View All Roles", "View All Employees",
            "Add a Department", "Add a Role", "Add an Employee",
            "Finish"
        ]
    })
    .then( ({choice}) => {
        switch (choice) {
            case "View All Departments": viewDepartments(); break;
            case "View All Roles": viewRoles("role"); break;
            case "View All Employees": viewEmployees("employee"); break;
            case "Add a Department": addDepartment(); break;
            case "Add a Role": addRole(); break;
            default: close();
        }
    });
};

// view all departments
const viewDepartments = () => viewDB(`SELECT * FROM department`);
const viewRoles = () => viewDB(`SELECT title, salary, name AS "department" FROM role 
JOIN department ON department_id = department.id`);
const viewEmployees = () => viewDB(`SELECT first_name, last_name, title, name AS "department", 
salary, manager_id FROM employee 
JOIN role ON role_id = role.id
JOIN department ON department_id = department.id`
);

// prompt to add a department
const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "What the department's name?",
        validate: input => blankCheck(input)
    })
    .then(data => {
        insertDB("department", data);
    });
};

// prompt to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What the role's title?",
            validate: input => blankCheck(input)
        },
        {
            type: "number",
            name: "salary",
            message: "What is the role's yearly salary?",
            validate: input => numCheck(input),
            filter: input => clearNum(input)
        },
        {
            type: "number",
            name: "department_id",
            message: "What is the role's department id?",
            validate: input => numCheck(input),
            filter: input => clearNum(input)
        }
    ])
    .then(data => {
        insertDB("role", data);
    });
};


// view using the query string, then return to main menu
const viewDB = queryString => {
    connection.query(queryString, (err, result) => {
        if (err) throw err;
        console.table(result);
        mainMenu();
    });
};

// insert data into selected table
const insertDB = (table, params) => {
    connection.query(`INSERT INTO ${table} SET ?`, params, (err, result) => {
        if (err) throw err;
        mainMenu();
    });
};

// close connection
const close = () => {
    console.log("Closing connection to database...");
    connection.end();
    console.log("Thank you for using Employee Manager.");
};

const blankCheck = input =>  (input) ? true : `You can't leave this blank.`;
const numCheck = input => (input && !isNaN(input)) ? true : `Please enter a valid number.`;
const clearNum = input => (input && !isNaN(input)) ? input : "";


module.exports = initPrompt;

/* Akram Sabbah */