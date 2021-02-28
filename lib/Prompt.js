/* Handles inquirer queries and uses responses to make SQL queries to connection */
const inquirer = require("inquirer");

class Prompt {
    constructor(db) {
        this.connection = db;
    }

    initPrompt() {
        console.log("/////////////////\n/EMPLOYEE TRACKER/\n/////////////////");
    }
}

module.exports = Prompt;

/* Akram Sabbah */