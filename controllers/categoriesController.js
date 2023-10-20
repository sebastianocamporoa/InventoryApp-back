const Category = require("../models/Category");

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        sort = "categoryName",
    } = req.query;

    try {
        const query = { categoryName: new RegExp(search, "i") };
        const total = await Category.countDocuments(query);

        const categories = await Category.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort(sort);

        res.json({
            total,
            limit: Number(limit),
            page: Number(page),
            categories,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear una nueva categoría
exports.addCategory = async (req, res) => {
    const { categoryName, associatedColor } = req.body;
    const newCategory = new Category({
        categoryName,
        associatedColor,
    });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json({ message: "Categoría eliminada" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};