const express = require('express')
const { addOrder } = require('../controllers/order')
const router = express.Router()

// Add order
router.post('/', addOrder)
module.exports = router
