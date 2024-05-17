const { products } = require("../models/data")
const { routes } = require("../router")

const sendAllProducts = ( req, res ) => {
    res.json(products)
}

const sendSingleProduct = ( req, res ) => {
    //console.log(req.params)
    const { id } = req.params;
    //console.log(id)
    const product = products.find((product) => product.id === Number(id) ) // find takes in a predicate
    if ( !product ) { // the find method returned undefined
        return res.json({"status": "FAIL", "message": "either param type or product id not found"})
    }
    return res.json(product)
    //res.json(todos[id]); // not a good idea because the params are all strings
}

const searchForProductWithName = ( req, res ) => {
    const { q } = req.query // extracts the search query
    let searchableProducts = [...products]
    const productMatchingQuery = []
    searchableProducts.forEach( (product) => {
        if (product.name.toLowerCase().includes(q.toLowerCase())){
            return productMatchingQuery.push(product)
        }
    })
    res.json(productMatchingQuery)
}

const handleRouteNotFound = ( req, res ) => { //needs working still
    res.send(`<h6>Requested route \" ${req.url} \" is not served by this server. Plz consult the documentation of the api.</h6>`)
}

module.exports = { sendAllProducts, sendSingleProduct, searchForProductWithName, handleRouteNotFound }