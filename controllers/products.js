const uuid = require('crypto')
const fs = require('fs')
const unicode = 'utf-8'

const dbJson = './db/db.json'

const addProduct = (req, res) => {
  try {
    const { productName, quantity, category, rackLocation, price } = req.body

    const id = uuid.randomUUID()

    if (!productName || !quantity || !category || !rackLocation || !price) {
      res.status(400).json({
        status: false,
        message: 'You entered incomplete data'
      })
    }

    // Get all products from json/db
    const dataRegistered = fs.readFileSync(dbJson, unicode)
    const data = JSON.parse(dataRegistered)

    const filterRack = data?.racks?.filter(
      (item) => item?.rack_id === rackLocation
    )

    filterRack[0]?.products.push({
      id: id,
      name: productName,
      quantity: quantity
    })

    // Add product to json/db
    data['products']?.push({
      id: id,
      name: productName,
      quantity: quantity,
      category: category,
      rack_id: rackLocation,
      price: price
    })

    const add = fs.writeFileSync(dbJson, JSON.stringify(data), unicode)
    res.status(200).json({
      status: true,
      message: 'Product added successful'
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error?.message ?? 'Data added failed'
    })
  }
}

const getProducts = (req, res) => {
  try {
    const data = fs.readFileSync(dbJson, unicode)
    res.status(201).json({
      status: true,
      message: 'success',
      total: JSON.parse(data)?.products?.length,
      data: JSON.parse(data)?.products
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? 'There is a problem in the database',
      data: []
    })
  }
}

module.exports = { addProduct, getProducts }
