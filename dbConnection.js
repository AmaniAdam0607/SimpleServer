/**
 * OPERATIONS TO INTERACT WITH THE DATABASE
 * Author: Amani Adam
 */
require('dotenv').config()
var mysql = require('mysql2');

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'fyp_db'
}).promise()


/**
 * Adds a user to the database
 * @async
 * @param {string} name 
 * @param {string} phonenumber 
 * @param {string} password 
 * @returns 1 if successful, 2 if user exists, and 0 if an error occur during db connection
 */

module.exports.registerUser = async (name, phonenumber, password) => {
    const sql = `INSERT INTO users (name, phone_number, password_hash, role_id) VALUES (?, ?, ?, 1)`
    try{
        const op = await checkIfUserExists(name, phonenumber)
        if ( op === 1 ) {
            // the user do not exist in our db
            try{
                const [ results, fields ] = await pool.query(sql, [name, phonenumber, password])
                if (results.affectedRows === 1) {
                    return 1
                }
                else{
                    return 0 // operation failed due db errors
                }
            }
            catch( err ) {
                return 0 // operation fail due to db connection error
            }
        }
        else if( op === 2 ) {
            // user exists in our db
            return 2
        }

        else if( op == 0) {
            // operation fail due to db connection
            return 0
        }
    }
    catch( err ) {
        return 0
    }
}

/**
 * Checks if the user is already in the database
 * @async
 * @param {string} name 
 * @param {string} phonenumber 
 * @returns 0 if error occurs, 1 if user do not exists, 2 if user exists
 */
const checkIfUserExists = async ( name, phonenumber ) => {
    const sql = `SELECT * FROM users WHERE name = ? AND phone_number = ?`

    try{
        const [results] = await pool.query(sql, [name, phonenumber])
        //console.log(results)

        if ( results.length >= 1 ) {
            return 2
        }
        else {
            return 1
        }
    }
    catch (err) {
        return 0
    }
}
