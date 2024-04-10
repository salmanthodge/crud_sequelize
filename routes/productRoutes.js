const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authmiddleware")
const productController = require("../controllers/productController")

router.post("/add-product",authMiddleware,productController.createProduct)
router.get("/product-list",authMiddleware,productController.listAllProducts)

module.exports = router
