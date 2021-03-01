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
            case "View All Departments": viewAll("department"); break;
            case "View All Roles": viewAll("role"); break;
            case "View All Employees": viewAll("employee"); break;
            case "Add a Department": addDepartment(); break;
            case "Add a Role": addRole(); break;
            default: close();
        }
    });
};

// make a "SELECT *" query to the selected table
const viewAll = table => {
    connection.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) throw err;
        console.table(result);
        mainMenu();
    });
};

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