/* Handles inquirer queries and uses responses to make SQL queries to connection */
const inquirer = require("inquirer");

class Prompt {
    constructor(db) {
        this.connection = db;
    }

    initPrompt() {
        console.log("//////////////////////\n// EMPLOYEE TRACKER //\n//////////////////////");
        return this.mainMenu();
    }

    // choose an action and call the corresponding member function
    mainMenu() {
        return inquirer.prompt({
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View All Departments", "Finish"
            ]
        })
        .then( ({choice}) => {
            switch (choice) {
                case "View All Departments": return this.view("department");
                default:
                    this.connection.end();
            }
        });
    }

    // make a "SELECT *" query to the selected table
    view(table) {
        this.connection.query(`SELECT * FROM ${table}`, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        return this.mainMenu();
    }
}

module.exports = Prompt;

/* Akram Sabbah */