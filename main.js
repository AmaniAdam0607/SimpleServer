/**
 * A simple server to provide an API for an ecommerce site
 * The API serves product listings and simple routes for the listing manipulation
 * Written by Amani Adam
 * 
 * "Into it"
 */

const express = require('express')
const { sendAllProducts, sendSingleProduct, searchForProductWithName, handleRouteNotFound } = require('./controllers/apiController')

const app  = express()

const portNumber = 3000

//app.use(express.json()); //this is a middleware. What is a middleware??

/* app.get("/", ( req, res ) => {
    res.render("index", { filename: "index.html"})
}) */

app.get("/api/v1/products", sendAllProducts)

app.get("/api/v1/products/:id", sendSingleProduct)

app.get("/api/v1/products/search/name", searchForProductWithName)

app.all("*", handleRouteNotFound)

app.listen(portNumber, () => {
    console.log(`Server is listening on http://localhost:${portNumber} ...`)
})
