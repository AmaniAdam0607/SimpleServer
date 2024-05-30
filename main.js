require('dotenv').config()

const express = require('express')
const jwt = require("jsonwebtoken")
const { getAllCustomers, registerCustomer, getCustomerDetail, getCustomerByName, checkIfCustomerExists } = require('./dbConnection')

const portNumber = 3000;

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post("/api/register", async ( req, res) => {
    const { username, phonenumber, password } = req.body
    // Check if user already in the database
    // If user already in the database, return a json response with a status FAIL and a MESSAGE saying 'Account withe the given credentials already exists'
    // If user is not in the database write a new user into the database with the role of 'user'
    console.log(`Username ${username} Password ${password} PhoneNumber ${phonenumber}`)
    res.end()
})

app.post("/api/login", async ( req, res ) => {
    // Authenticate user
    // -- Check if user exists in the database
    // -- Check if the supplied password, name, and phone number marches the one in the database

    const { username, phonenumber, password } = req.body
    const user = { name: username, phonenumber: phonenumber}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken: accessToken })

})

app.get("/api/user/cards", authenticateToken,async ( req, res ) => {
    const response = {"user": req.user, "cards": "Card List for this user"}
    res.json(response)
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // return token only if we have the auth header

    if ( token == null ) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if ( err ) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}


app.listen(portNumber, () => {
    console.log(`Server started at port ${portNumber}`)
})