const express = require('express');

const app  = express();

app.use(express.json());

const todos = [
    {
        "title": "Study Express",
        "Description": "Study how to make simple working web servers."
    }
]


app.get("/todos", ( req, res ) => {
    res.send(todos);
    res.end()
});

app.get("todo/:id", (req, res) => {
    console.log(req.url)
    const { id } = req.params;
    res.send(todos[id]);
    res.end();
})

app.listen(3000, () => {
    console.log(`Server is listening for requests!!`)
});
