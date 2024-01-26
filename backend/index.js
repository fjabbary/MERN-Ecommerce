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

app.use(cors({
  origin: ["https://mern-ecommerce-fe.vercel.app"],
  methods: ["POST","GET", "PUT"],
  credentials: true
}));

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
    searchResults: nameOrDescMatch
  });
})

app.post("/api/advancedSearch", async (req, res) => {
  const { minPrice, maxPrice, category } = req.body.data;

  const foundProducts = await Product.find({ price: { $lte: maxPrice }, price: { $gte: minPrice }, category });

  res.send({
    numOfResults: foundProducts.length,
    minPrice,
    maxPrice,
    category,
    results: foundProducts
  });
})

app.get('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const foundUser = await User.findById(userId);

  res.send({ user: foundUser });
})

app.put('/api/addToFavorite', async (req, res) => {

  const { userId, favoriteProduct } = req.body;

  const favorites = await User.findById(userId).select('favorites');
  const favoriteExist = favorites.favorites.find(item => item._id === favoriteProduct._id)

  if (!favoriteExist) {
    await User.findByIdAndUpdate(userId, { "$addToSet": { "favorites": favoriteProduct } }, { new: true })
    res.send('Add to the favorite products');
  } else {
    res.send('Product already added to the favorites')
  }
})

app.post('/api/getFavorites', async (req, res) => {
  const { userId } = req.body;
  const favorites = await User.findById(userId).select('favorites');
  res.send(favorites);
})

app.put('/api/deleteFavorite/:productId', async (req, res) => {
  const { userId } = req.body;
  const productId = req.params.productId;

  await User.findByIdAndUpdate(userId, { $pull: { favorites: { _id: productId } } }, { new: true })

  res.send(productId);
})

app.put('/api/rateProductLike/:productId/:dir', async (req, res) => {
  const productId = req.params.productId;
  const direction = req.params.dir;
  let step;
  direction === 'inc' ? step = 1 : step = -1;


  const response = await Product.findByIdAndUpdate({ _id: productId }, { $inc: { likeCount: step } }, { new: true }).exec()
  res.send(response)
})

app.put('/api/rateProductDislike/:productId/:dir', async (req, res) => {
  const productId = req.params.productId;
  const direction = req.params.dir;
  let step;
  direction === 'inc' ? step = 1 : step = -1;

  const response = await Product.findByIdAndUpdate({ _id: productId }, { $inc: { dislikeCount: step } }, { new: true }).exec()
  res.send(response)
})


app.post('/api/addComment', async (req, res) => {
  const { headline, feedback, productId } = req.body;
  const name = req.body.auth.user.name;
  const newComment = {
    headline,
    feedback,
    name
  }
  const response = await Product.findByIdAndUpdate({ _id: productId }, { $push: { comments: newComment } })

  res.send([...response.comments, newComment])
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
