const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

router.post("/", purchaseController.addPurchase);
router.get("/", purchaseController.getPurchases);

module.exports = router;
