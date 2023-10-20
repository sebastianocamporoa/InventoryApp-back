const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const Category = require('../models/Category');

exports.addPurchase = async (req, res) => {
  try {
    const { productName, categoryId, quantity, unitCost } = req.body;

    // Buscamos el producto por nombre
    let product = await Product.findOne({ name: productName });

    if (product) {
      // Si el producto existe, actualizamos el stock y los precios

      // Cálculo del Costo Unitario Promedio
      const currentAverageCost = product.averageUnitCost;
      const newAverageCost = (currentAverageCost + unitCost) / 2;
      const highestCost = Math.max(currentAverageCost, unitCost);
      const calculatedCost = newAverageCost + (highestCost - newAverageCost) * 0.25;

      // Actualizar el precio de venta actual
      const newSalePrice = calculatedCost + (calculatedCost * 0.20);

      // Actualizar el stock
      product.quantityInStock += quantity;

      // Guardar cambios
      product.averageUnitCost = calculatedCost;
      product.currentSalePrice = newSalePrice;

      await product.save();
    } else {
      // Si el producto no existe, lo creamos
      product = new Product({
        name: productName,
        quantityInStock: quantity,
        averageUnitCost: unitCost,
        currentSalePrice: unitCost + (unitCost * 0.20),
        category: categoryId
      });

      await product.save();
    }

    // Creamos el registro de la compra
    const purchase = new Purchase({
      product: product._id,
      quantity,
      unitCost
    });

    await purchase.save();

    return res.status(201).json({
      message: 'Purchase added successfully',
      purchase
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

exports.getPurchases = async (req, res) => {
  // Aquí iría la lógica para obtener la lista de compras
};
