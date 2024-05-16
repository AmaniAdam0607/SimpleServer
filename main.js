/**
 * A simple server to provide an API for an ecommerce site
 * The API serves product listings and simple routes for the listing manipulation
 * Written by Amani Adam
 * 
 * "Into it"
 */

const express = require('express')
const { sendAllProducts, sendSingleProduct, searchForProductWithName, handleRouteNotFound } = require('./controllers/apiController')
const { routes } = require("./router")

const app  = express()

const portNumber = 3000

//app.use(express.json()); //this is a middleware. What is a middleware??


app.get(routes.product_list, sendAllProducts)

app.get(routes.product_detail, sendSingleProduct)

app.get(routes.search_product_name, searchForProductWithName)

app.all(routes.all_other, handleRouteNotFound)

app.listen(portNumber, () => {
    console.log(`Server is listening on localhost:${portNumber}...`)
})
