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
  category: String
})

const Product = mongoose.model('Product', productSchema)

exports.Product = Product;