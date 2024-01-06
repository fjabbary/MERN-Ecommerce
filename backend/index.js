const express = require('express');
const cors = require('cors');
// const products = require('./products');
const register = require('./routes/register');
const login = require('./routes/login');

const { Category } = require('./models/category');
const { Product } = require('./models/product');
const { User } = require('./models/user');


const mongoose = require('mongoose');

const stripe = require('./routes/stripe');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/stripe", stripe)

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Welcome to the API!");
})

app.get('/categories', async (req, res) => {
  const categories = await Category.find()
  res.send(categories);
})

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
})

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const oneProduct = await Product.findById(id);

  res.send(oneProduct);
})


app.get("/api/search/:query", async (req, res) => {
  let query = req.params.query;
  const Query = new RegExp(query, 'i');
  const nameOrDescMatch = await Product.find({ $or: [{ name: { $regex: Query } }, { features: { $in: Query } }] })

  res.send({
    numOfResults: nameOrDescMatch.length,
    results: nameOrDescMatch
  });
})

app.post("/api/advancedSearch", async (req, res) => {
  const { minPrice, maxPrice, category } = req.body.data;
  console.log(req.body);

  const foundProducts = await Product.find({ price: { $lte: maxPrice }, price: { $gte: minPrice }, category });

  res.send({
    numOfResults: foundProducts.length,
    results: foundProducts
  });
})

app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const foundUser = await User.findById(userId);

  res.send({ user: foundUser });
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