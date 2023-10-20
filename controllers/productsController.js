const Product = require("../models/Product");
const Category = require("../models/Category");
const Sale = require("../models/Sale");

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const categoryFilter = req.query.category;
    let products;

    if (categoryFilter) {
      products = await Product.find({ category: categoryFilter });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Obtener 5 últimos productos registrados
exports.getRecentProducts = async (req, res) => {
  try {
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 }) // Ordenar de manera descendente por fecha de creación
      .limit(5); // Limitar a 5 registros

    res.json(recentProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Añadir un nuevo producto
exports.addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    unitCost: req.body.unitCost,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Vender un producto
exports.sellProduct = async (req, res) => {
  try {
    const { productName, productCategory, quantitySold, salePrice } = req.body;

    // Obtener todos los productos que coinciden con el nombre y categoría
    const category = await Category.findOne({ categoryName: productCategory });
    if (!category) {
      return res.status(400).send({ message: "Categoría no encontrada" });
    }

    const matchingProducts = await Product.find({
      name: productName,
      category: category.id,
    });
    // Calcular el inventario total de estos productos
    const totalInventory = matchingProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    if (totalInventory < quantitySold) {
      return res
        .status(400)
        .send({
          message:
            "No hay suficiente inventario, inventario restante: " +
            totalInventory,
        });
    }

    let quantityToDeduct = quantitySold;
    for (const product of matchingProducts) {
      if (product.quantity >= quantityToDeduct) {
        product.quantity -= quantityToDeduct;
        await product.save();
        break; // Ya se ha satisfecho la cantidad vendida
      } else {
        quantityToDeduct -= product.quantity;
        product.quantity = 0;
        await product.save();
      }
    }

    const sale = new Sale({
      productName,
      productCategory,
      quantitySold,
      salePrice,
    });
    await sale.save();

    res.status(201).send(sale);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
