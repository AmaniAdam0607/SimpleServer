require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { registerUser, getUserPassword } = require('./dbConnection')

const portNumber = 3000;

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post("/api/register", async ( req, res) => {

    let hashedPassword = ''

    const { username, phonenumber, password } = req.body

    try {
        const salt = await bcrypt.genSalt()
        hashedPassword = await bcrypt.hash(password, salt)
    }
    catch ( err ) {
        res.json({"STATUS": "FAIL", "MESSAGE": "Internal Server Error"})
    }

    const op = await registerUser(username, phonenumber, hashedPassword)

    if ( op === 1 ) {
        res.json({"STATUS": "SUCCESSFUL", "MESSAGE": "User registered successfully"})
    }
    if ( op === 2 ) {
        res.json({"STATUS": "FAIL", "MESSAGE": "User already exists."})
    }
    if ( op === 0 ) {
        res.json({"STATUS": "FAIL", "MESSAGE": "Internal Server Error"})
    }
})

app.post("/api/login", async ( req, res ) => {
    
    const { username, phonenumber, password } = req.body

    const hashedPassword = await getUserPassword( username, phonenumber )

    if (!( hashedPassword === null )) {
        if ( await bcrypt.compare(password, hashedPassword) ) {
            // create token if the password is correct
            const user = { name: username, phonenumber: phonenumber}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
        }
        else {
            res.json({"STATUS": "FAIL", "MESSAGE": "Wrong Password"})
        }
    }
    else {
        res.json({"STATUS": "FAIL", "MESSAGE": "Internal Server Error"})
    }
    

})

app.get("/api/user/cards", authenticateToken,async ( req, res ) => {
    const response = {"user": req.user, "cards": "Card List for this user"}
    res.json(response)
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // return token only if we have the auth header

    if ( token == null ) {
        return res.json({"STATUS": "FAIL", "MESSAGE": "Please provide auth token"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if ( err ) {
            return res.json({"STATUS": "FAIL", "MESSAGE": "Please provide valid auth token"})
        }
        req.user = user
        next()
    })
}


app.listen(portNumber, () => {
    console.log(`Server started at port ${portNumber}`)
})