const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true }, // Cantidad de unidades en el Nuevo Pedido
  unitCost: { type: Number, required: true }, // Costo Unitario en el nuevo Pedido
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
