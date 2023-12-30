const express = require('express');
const cors = require('cors');
const products = require('./products');
const categories = require('./categories');
const register = require('./routes/register');
const login = require('./routes/login');

const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/register", register)
app.use("/api/login", login)

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

app.get("/products/:category/:id", (req, res) => {
  const { id, category } = req.params;
  const product = products.filter(item => {
    if (item.title === category) {
      return { ...item }
    }
  })

  const foundItem = product[0].items.find(product => product.id == id);
  res.send(foundItem);
})


const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
})


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("MongoDB Connection failed ", err.message))