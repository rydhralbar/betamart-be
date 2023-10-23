const express = require('express')
const { addOrder, updateQty } = require('../controllers/order')
const router = express.Router()

// Add order
router.post('/', addOrder)

module.exports = router
