const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
  name: String,
  features: [String],
  imageUrl: String,
  images: {
    type: [Object],
    required: false
  },
  price: Number,
  category: String,
  likeCount: Number,
  dislikeCount: Number
})

const Product = mongoose.model('Product', productSchema)

exports.Product = Product;