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
            "View All Departments", "View All Roles", "View All Employees",
            "Add a Department", "Add a Role", "Add an Employee",
            "Update an Employee", "Finish"
        ]
    })
    .then( ({choice}) => {
        switch (choice) {
            case "View All Departments": viewDepartments(); break;
            case "View All Roles": viewRoles("role"); break;
            case "View All Employees": viewEmployees("employee"); break;
            case "Add a Department": addDepartment(); break;
            case "Add a Role": addRole(); break;
            case "Add an Employee": addEmployee(); break;
            default: close();
        }
    });
};

// view all departments
const viewDepartments = () => viewDB(`SELECT * FROM department`);

// view all roles (join with department to get department name)
const viewRoles = () => viewDB(`SELECT title, salary, name AS "department" FROM role 
JOIN department ON department_id = department.id`);

// view all employees (join with both role and itself to get job and manager)
// NOTE: left join with managers, since we want to display employees with null managers too.
const viewEmployees = () => viewDB(`SELECT e.first_name, e.last_name, title, name AS "department", 
salary, CONCAT(m.first_name, " ", m.last_name) AS "manager" FROM employee e 
JOIN role ON role_id = role.id
JOIN department ON department_id = department.id
LEFT JOIN employee m ON e.manager_id = m.id`);


// prompt to add a department
const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "What the department's name?",
        validate: input => blankCheck(input)
    })
    .then(data => {
        console.log(`Added ${data.name} to the database.`);
        insertDB("department", data);
    });
};

// prompt to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What the role's title?",
            validate: input => blankCheck(input)
        },
        {
            type: "number",
            name: "salary",
            message: "What is the role's yearly salary?",
            validate: input => numCheck(input),
            filter: input => clearNum(input)
        },
        {
            type: "number",
            name: "department_id",
            message: "What is the role's department id?",
            validate: input => numCheck(input),
            filter: input => clearNum(input)
        }
    ])
    .then(data => {
        console.log(`Added ${data.title} to the database.`);
        insertDB("role", data);
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What the employee's first name?",
            validate: input => blankCheck(input)
        },
        {
            type: "input",
            name: "last_name",
            message: "What the employee's last name?",
            validate: input => blankCheck(input)
        },
        {
            type: "input",
            name: "role",
            message: "What the employee's role?",
            validate: input => blankCheck(input)
        },
        {
            type: "input",
            name: "manager_id",
            message: "Who is the employee's manager?"
        }
    ])
    .then(data => {
        console.log(`Added ${data.first_name} ${data.last_name} to the database.`);
        insertDB("employee", data);
    });
};


// view using the query string, then return to main menu
const viewDB = queryString => {
    connection.query(queryString, (err, result) => {
        if (err) throw err;
        console.table(result);
        mainMenu();
    });
};

// insert data into selected table
const insertDB = (table, params) => {
    connection.query(`INSERT INTO ${table} SET ?`, params, (err, result) => {
        if (err) throw err;
        mainMenu();
    });
};

// close connection
const close = () => {
    console.log("Closing connection to database...");
    connection.end();
    console.log("Thank you for using Employee Manager.");
};

// validation functions
const blankCheck = input =>  (input) ? true : `You can't leave this blank.`;
const numCheck = input => (input && !isNaN(input)) ? true : `Please enter a valid number.`;
const clearNum = input => (input && !isNaN(input)) ? input : "";


module.exports = initPrompt;

/* Akram Sabbah */