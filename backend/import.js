const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const mongoose = require('mongoose');

const Product = require('./models/product.js');

console.log(process.env.DB_URI);

mongoose.connect(process.env.DB_URI)
  .then(con => {
    console.log('DB connection successful');
  })


const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'))



const importData = async () => {
  try {
    await Product.create(products, { validateBeforeSave: false })
  } catch (err) {
    console.log(err)
  }
  process.exit();
}

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err)
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData();
  console.log('Data successfully added!');

} else if (process.argv[2] === '--delete') {
  deleteData()
}
console.log(process.argv);