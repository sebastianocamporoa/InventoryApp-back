const Product = require("../models/Product");
const Sale = require("../models/Sale");

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSales = await Sale.countDocuments();

    // Modificación para calcular las ganancias totales
    const totalEarnings = await Sale.aggregate([
      {
        $project: {
          totalSale: { $multiply: ["$salePrice", "$quantitySold"] },
        },
      },
      {
        $group: { _id: null, total: { $sum: "$totalSale" } },
      },
    ]);

    // Agrupar productos por nombre y categoría
    const groupedProducts = await Product.aggregate([
      {
        $group: {
          _id: { name: "$name", category: "$category" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalProducts: totalProducts,
      totalSales: totalSales,
      totalEarnings: totalEarnings[0]?.total || 0,
      groupedProducts: groupedProducts,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error al obtener el resumen del dashboard." });
  }
};
