/* IMPORTS */
const mysql  = require("mysql2");
const { user, pass } = require("./utils/credentials").getCredentials();
const initializeDB = require("./db/database");
const initPrompt = require("./lib/Prompt");

/* GLOBALS */
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: user,
    password: pass
});

/* MAIN */
// initialize database and begin prompt
connection.connect(err => {
    if (err) throw err;
    
    // initialize database
    initializeDB(connection);

    // initialize inquirer prompt
    initPrompt(connection);
});

/* Akram Sabbah */