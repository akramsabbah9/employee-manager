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
            "View All Departments", "Finish"
        ]
    })
    .then( ({choice}) => {
        switch (choice) {
            case "View All Departments":
                view("department");
                break;
            default:
                close();
        }
    });
};

// make a "SELECT *" query to the selected table
const view = table => {
    connection.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) throw err;
        console.table(result);
        mainMenu();
    });
};

// close connection
const close = () => {
    console.log("Closing connection to database...");
    connection.end();
    console.log("Thank you for using Employee Manager.");
};

module.exports = initPrompt;

/* Akram Sabbah */