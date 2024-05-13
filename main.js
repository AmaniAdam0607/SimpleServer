/**
 * A simple server to provide an API for an ecommerce site
 * The API serves product listings and simple routes for the listing manipulation
 * Written by Amani Adam
 * 
 * "Into it"
 */


const { products } = require("./data")
const express = require('express');

const app  = express();

//app.use(express.json()); //this is a middleware. What is a middleware??


app.get("/api/v1/products", ( req, res ) => {
    res.json(products) // this sends a json response, set the content header for us
});

app.get("/api/v1/products/:id", (req, res) => {
    //console.log(req.params)
    const { id } = req.params;
    //console.log(id)
    const product = products.find((product) => product.id === Number(id) ) // find takes in a predicate
    if ( !product ) { // the find method returned undefined
        return res.json({"status": "FAIL", "message": "either param type or product id not found"})
    }
    return res.json(product)
    //res.json(todos[id]); // not a good idea because the params are all strings
})

app.get("/api/v1/products/search/name", ( req, res ) => {
    const { q } = req.query // extracts the search query
    let searchableProducts = [...products]
    const productMatchingQuery = []
    searchableProducts.forEach( (product) => {
        if (product.name.toLowerCase().includes(q.toLowerCase())){
            return productMatchingQuery.push(product)
        }
    })
    res.json(productMatchingQuery)
})

app.listen(3000, () => {
    console.log(`Server is listening for requests!!`)
});
