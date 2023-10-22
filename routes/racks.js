const express = require('express')
const { addRack, getRack } = require('../controllers/racks')
const router = express.Router()

// Add rack to json/db
router.post('/add', addRack)

// Get racks from json/db
router.get('/:rack', getRack)

module.exports = router
