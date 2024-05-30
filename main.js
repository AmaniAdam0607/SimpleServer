const express = require('express')
const { getAllCustomers, registerCustomer, getCustomerDetail, getCustomerByName, checkIfCustomerExists } = require('./dbConnection')

const portNumber = 3000;

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post("/api/register", async ( req, res) => {
    const { username, phonenumber, password } = req.body
    const result = await getCustomerDetail( id )
    console.log(`Username ${username} Password ${password} PhoneNumber ${phonenumber}`)
    res.end()
})

app.listen(portNumber, () => {
    console.log(`Server started at port ${portNumber}`)
})