const express = require('express')
const app = express()
const natsWrapper = require('./nats_wrapper')
const cors = require('cors')
const ProductCreatedListner = require('./product-created-listener')

const myEmitter = require('./eventEmitter')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

let products = []

myEmitter.on('product-received', (data) => {
    console.log("Product Received : ", data)
    products.push(data)
})

app.get('/api/order/product', (req, res) => {
    res.send({
        products: products
    })
})

const start = async () => {

    try {
        await natsWrapper.connect()

        new ProductCreatedListner(natsWrapper.getClient()).listen()

        app.listen(PORT, () => {
            console.log("Server listening on port ", PORT)
        })
    } catch (err) {
        console.log(err)
    }
}

start()