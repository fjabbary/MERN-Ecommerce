const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxLength: 200
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024
  },
  favorites: [Object]
})


const User = mongoose.model('User', userSchema)

exports.User = User;
