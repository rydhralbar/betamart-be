require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const productsRoute = require('./routes/products')
const racksRoute = require('./routes/racks')
const orderRoute = require('./routes/order')

const router = express.Router()

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Url to access products
app.use('/products', productsRoute)

// Url to access racks
app.use('/racks', racksRoute)

// Url to order
app.use('/order', orderRoute)

app.get('/', (req, res) => {
  res.json({ status: true, message: 'Server running', version: '1.0' })
})

app.listen(port, () => {
  console.log(`Beta Mart App listening on port ${port}`)
})

module.exports = router
