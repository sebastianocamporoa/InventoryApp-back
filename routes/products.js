const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Obtener todos los productos
router.get("/", productsController.getAllProducts);

//Obtener 5 últimos productos registrados
router.get("/recent", productsController.getRecentProducts);

// Obtener un producto por ID
router.get("/:id", productsController.getProductById);

// Añadir un nuevo producto
router.post("/", productsController.addProduct);

// Actualizar un producto
router.put("/:id", productsController.updateProduct);

// Eliminar un producto
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
