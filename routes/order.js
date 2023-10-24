const { addOrder } = require('../controllers/order')
const express = require('express')
const router = express.Router()

// Add order
router.post('/', addOrder)

module.exports = router
