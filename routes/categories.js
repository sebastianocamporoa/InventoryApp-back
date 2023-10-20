const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");

// Obtener todas las categorías
router.get("/", categoriesController.getAllCategories);

// Obtener una categoría por ID
router.get("/:id", categoriesController.getCategoryById);

// Crear una nueva categoría
router.post("/", categoriesController.addCategory);

// Actualizar una categoría
router.patch("/:id", categoriesController.updateCategory);

// Eliminar una categoría
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
