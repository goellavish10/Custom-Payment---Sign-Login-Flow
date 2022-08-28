const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
