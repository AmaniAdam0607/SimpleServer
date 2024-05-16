const routes = {
    product_list: "/api/v1/products",
    product_detail: "/api/v1/products/:id",
    search_product_name: "/api/v1/products/search/name",
    all_other: "*"
}

module.exports = { routes }