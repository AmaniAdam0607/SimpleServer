const express = require('express');

const app  = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/", ( req, res ) => {
    spitInfo(req);
    res.send("<h1>Aloooh!!</h1>");
});

app.get("/news/:about_time", ( req, res ) => {
    spitInfo(req);
    res.send(`Reuest for ${req.url}`);
});

const spitInfo = ( req ) => {
    console.log(`Request for ${req.url}`);
    console.log(`Request body ${req.body}`);
    console.log(`Request query ${req.query}`);
    //console.log(`With params ${JSON.stringify(req.params)}`);
}

app.listen(3000, () => {
    console.log(`Server is listening for requests!!`)
});
