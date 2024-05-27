// learning CRUD with mysql and node
var mysql = require('mysql2');

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: 'Amtherealist@1',
    database: 'mydb'
}).promise()

const getAllCustomers = async () => {
    let sql = 'SELECT * FROM customers'
    const [rows] = await pool.query(sql)
    return rows
}

const registerCustomer = async (name, address) => {
    const sql = `INSERT INTO customers (name, address) VALUES (?, ?)`
    const result = await pool.query(sql, [name, address])
    return result
}

const getCustomerDetail = async ( id ) => {
    const sql = 'SELECT * FROM customers WHERE id = ?'
    const [result] = await pool.query(sql, [id])
    console.log(result)
}

//getAllCustomers()
//registerCustomer("Magreth Fransis", "Ngaramtoni, Arusha")
getCustomerDetail(3)