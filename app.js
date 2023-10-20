const express = require("express");
const initDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const purchaseRoutes = require("./routes/purchaseRoutes");
const dashboardRoutes = require("./routes/dashboard");


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/dashboard', dashboardRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//Conexión a DB
initDB();
