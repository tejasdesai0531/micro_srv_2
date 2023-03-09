const { Listner } = require('@simply-eat/common')

const myEmitter = require('./eventEmitter')

class ProductCreatedListner extends Listner {

    getSubject() { return 'product:created' }

    onMessage(data, msg) {
        console.log("Inside onMessage : ", data)
        myEmitter.emit('product-received', data)
        msg.ack();
    }
}

module.exports = ProductCreatedListner