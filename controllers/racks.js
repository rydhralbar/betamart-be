const { error } = require('console')
const uuid = require('crypto')
const fs = require('fs')
const unicode = 'utf-8'

const dbJson = './db/db.json'

const addRack = (req, res) => {
  try {
    const { rackLocation, category, capacity } = req.body

    // Get all products from json/db
    const dataRegistered = fs.readFileSync(dbJson, unicode)
    const data = JSON.parse(dataRegistered)

    // Add to json/db
    data['racks'].push({
      rack_id: rackLocation,
      category: category,
      capacity: capacity,
      products: []
    })
    const addToDb = fs.writeFileSync(dbJson, JSON.stringify(data), unicode)

    res.status(200).json({
      status: true,
      message: 'Product added successful'
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message ?? error,
      data: 'Product added failed'
    })
  }
}

const getRack = (req, res) => {
  try {
    const { rack } = req.params
    const dataRegistered = fs.readFileSync(dbJson, unicode)
    const data = JSON.parse(dataRegistered)?.racks

    const filterData = data.filter(
      (item) => item?.category.toLowerCase() === rack.toLowerCase()
    )
    if (filterData) {
      res.status(201).json({
        status: true,
        message: 'Data retrieved successful',
        data: filterData[0]
      })
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? 'Data retrieved failed'
    })
  }
}

module.exports = { addRack, getRack }
