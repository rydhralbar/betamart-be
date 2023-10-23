const fs = require('fs')
const unicode = 'utf-8'

const dbJson = './db/db.json'

const addOrder = (req, res) => {
  try {
    const { productId, productName, quantity } = req.body

    const dataRegistered = fs.readFileSync(dbJson, unicode)
    let data = JSON.parse(dataRegistered)
    const dataProduct = data?.products
    const filterProduct = data?.products?.filter(
      (item) => item?.id === productId
    )
    if (data.length === 0) {
      res
        .status(401)
        .json({ status: false, message: 'Product stock is out of stock' })
    }

    data['products'].filterProduct = {
      id: filterProduct?.productId ?? productId,
      name: filterProduct?.name ?? productName,
      quantity: filterProduct?.quantity - quantity
    }

    const add = fs.writeFileSync(dbJson, JSON.stringify(data), unicode)

    res.status(201).json({
      status: true,
      message: 'Order added successful, thanks for buying'
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error?.message ?? 'Order failed, please try again later'
    })
  }
}

module.exports = { addOrder }
