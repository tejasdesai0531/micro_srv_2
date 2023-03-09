const express = require('express')
const app = express()
const natsWrapper = require('./nats_wrapper')
const cors = require('cors')
const ProductCreatedListner = require('./product-created-listener')

app.use(cors())
app.use(express.json())

const start = async () => {

    try {
        await natsWrapper.connect()

        new ProductCreatedListner(natsWrapper.getClient()).listen()

        app.listen(3001, () => {
            console.log("Server listening on port 3001")
        })
    } catch (err) {
        console.log(err)
    }
}

start()