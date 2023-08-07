const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World Pontuale');
})

app.listen(port, () => {
    console.log(`Example app listeing on port ${port}`);
})
