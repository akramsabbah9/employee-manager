/* IMPORTS */
const express = require("express");
const mysql  = require("mysql2");
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
connection.connect(err => {
    if (err) throw err;
    console.log("Connected");
    // create the database if it doesn't exist yet
    connection.query("CREATE DATABASE IF NOT EXISTS employeeDB", (err, result) => {
        if (err) throw err;
        console.log("Database created");
    });

    // use the employeeDB database
    connection.query("USE employeeDB", (err, result) => {
        if (err) throw err;
        console.log("Now using database");
    })

    // create the tables if necessary
    connection.query(`CREATE TABLE IF NOT EXISTS department (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        PRIMARY KEY (id)
        )`, (err, result) => {
        if (err) throw err;
        console.log("department table created");
    });

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