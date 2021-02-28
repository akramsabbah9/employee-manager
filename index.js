/* IMPORTS */
const mysql  = require("mysql2");
const { user, pass } = require("./utils/credentials").getCredentials();
const initializeDB = require("./db/database");
const Prompt = require("./lib/Prompt");

/* GLOBALS */
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: user,
    password: pass
});

/* FUNCTIONS */

/* MAIN */
// create & initialize database, start server, and begin prompt
connection.connect(err => {
    if (err) throw err;
    
    // initialize database
    initializeDB(connection);

    // initialize inquirer prompt
    const tracker_prompt = new Prompt(connection)
    tracker_prompt.initPrompt();
    connection.end();
});

/* Akram Sabbah */