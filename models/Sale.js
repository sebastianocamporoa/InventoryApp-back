const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantitySold: Number,
  salePrice: Number,
  saleDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", saleSchema);
