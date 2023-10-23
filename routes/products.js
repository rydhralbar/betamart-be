const {
  getProducts,
  addProduct,
  getLimitProduct
} = require('../controllers/products')
const express = require('express')
const router = express.Router()

// Add product to json/db
router.post('/add', addProduct)

// Get product from json/db
router.get('/:limit?', getProducts)

module.exports = router
