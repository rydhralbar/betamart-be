require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

const router = express.Router()
const apiRoot = '/api'

const db = {
  Oreo: {
    productName: 'Oreo',
    quantity: 10,
    category: 'Snack',
    rackLocation: 1,
    price: 5000
  }
}

app.use(bodyParser.json())

app.use(apiRoot, router)

router.post('/add', (req, res) => {
  const body = req.body

  if (
    !body.productName ||
    !body.quantity ||
    !body.category ||
    !body.rackLocation ||
    !body.price
  ) {
    return res
      .status(400)
      .json({ status: false, message: 'You entered incomplete data' })
  }

  if (db[body.productName]?.productName === body.productName) {
    const increase =
      parseInt(db[body.productName].quantity) + parseInt(body.quantity)

    const product = {
      productName: body.productName,
      quantity: increase,
      category: body.category,
      rackLocation: body.rackLocation,
      price: body.price
    }

    res.status(201).json({
      status: true,
      message: `The quantity of ${body.productName} has been increased`,
      data: product
    })
    db[body.productName] = product
  } else {
    const product = {
      productName: body.productName,
      quantity: body.quantity,
      category: body.category,
      rackLocation: body.rackLocation,
      price: body.price
    }

    db[product.productName] = product

    return res.status(201).json({
      status: true,
      message: 'Product added successful',
      data: product
    })
  }
})

router.get('/products', (req, res) => {
  return res.status(201).json({
    status: true,
    message: 'Products retrieved successful',
    data: db
  })
})

app.get('/', (req, res) => {
  res.json({ status: true, message: 'Server running', version: '1.0' })
})

app.listen(port, () => {
  console.log(`Beta Mart App listening on port ${port}`)
})

module.exports = router
