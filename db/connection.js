const mysql = require('mysql2');
const start = require('../index.js')


// connect using .env variables
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Shyriiwook1@',
        database: 'employee_tracker',
        rowsAsArray: true
    },
    console.log('employee_tracker connection successful.')
);


module.exports = db;