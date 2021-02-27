/* IMPORTS */
const express = require("express");
const mysql  = require("mysql2");
const { user, pass } = require("./utils/credentials").getCredentials();


/* GLOBALS */
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: user,
    password: pass,
    database: "employeeDB"
});

/* FUNCTIONS */

/* MAIN */

/* Akram Sabbah */