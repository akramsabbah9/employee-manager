/* Edit, store and retrieve username and password for the MySQL database */
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const credentialsPath = path.join(__dirname, "./cred.txt");

// read the username and password from the credentials file.
const getCredentials = () => {
    const credentials = JSON.parse(
        fs.readFileSync(credentialsPath, (err, data) => {
            if (err) throw err;
        })
    );
    //console.log(__dirname, credentials);
    return { 
        user: credentials.user,
        pass: credentials.pass
    }
};

// save a username and password to the credentials file
const saveCredentials = data => fs.writeFileSync(credentialsPath, JSON.stringify(data, null, 4));

// prompt user for username and/or password, and save the answers
const credentialsPrompt = () => {
    console.log("Please enter your MySQL username and password for use with \
    the Employee Tracker application. They will be stored in utils/cred.txt.");
    inquirer.prompt([
        {
            type: "input",
            name: "user",
            message: "Username: "
        },
        {
            type: "password",
            name: "pass",
            message: "Password: "
        }
    ])
    .then(answers => saveCredentials(answers));
};

module.exports = { getCredentials, credentialsPrompt };