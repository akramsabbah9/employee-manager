/* IMPORTS */
const express = require("express");
const mysql  = require("mysql2");
const initializeDB = require("./db/database");
const { user, pass } = require("./utils/credentials").getCredentials();

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

    connection.query("INSERT INTO department SET ?", {name: "test"}, (err, result) => {
        if (err) throw err;
        console.log("inserted test data");
    });

    connection.query("SELECT * FROM department", (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        connection.end();
    });
});

/* Akram Sabbah */