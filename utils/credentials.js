/* Edit, store and retrieve username and password for the MySQL database */
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const credentialsPath = path.join(__dirname, "./cred.txt");

// return the username and password from the credentials file
const getCredentials = () => {
    // if the file doesn't exist, throw an error telling user to add their credentials
    if (!fs.existsSync(credentialsPath)) {
        throw Error("Credentials file does not yet exist. Use `npm run credentials` first!");
    }

    // if it does exist, just read the credentials from the existing file
    return readCredentials();
};

// read from credentials file and return credentials
const readCredentials = () => {
    const credentials = JSON.parse(
        fs.readFileSync(credentialsPath, (err, data) => {
            if (err) throw err;
        })
    );
    return credentials;
};

// save a username and password to the credentials file
const saveCredentials = data => fs.writeFileSync(credentialsPath, JSON.stringify(data, null, 4));

// prompt user for username and/or password, and save the answers
const credentialsPrompt = () => {
    console.log("Please enter your MySQL username and password for use with \
the Employee Tracker application. They will be stored in utils/cred.txt.");
    return inquirer.prompt([
        {
            type: "input",
            name: "user",
            message: "Username: ",
            default: "root"
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

/* Akram Sabbah */