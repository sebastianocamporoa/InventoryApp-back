const mongoose = require("mongoose");

const DB_URI = `mongodb://127.0.0.1:27017/InventoryDB`;

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Corregido el typo 'useInifiedTopology' a 'useUnifiedTopology'
    });
    console.log("Conexión correcta");
  } catch (err) {
    console.log("DB Error", err);
  }
};
