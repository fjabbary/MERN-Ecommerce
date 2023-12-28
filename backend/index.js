const express = require('express');
const cors = require('cors');
const products = require('./products');
const categories = require('./categories');

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
})

app.get('/categories', (req, res) => {
  res.send(categories);
})

app.get("/products", (req, res) => {
  res.send(products);
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
}) 