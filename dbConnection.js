// learning CRUD with mysql and node
var mysql = require('mysql2');

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: 'Amtherealist@1',
    database: 'mydb'
}).promise()

