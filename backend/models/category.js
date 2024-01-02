const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})


const Category = mongoose.model('Category', categorySchema)

exports.Category = Category;
