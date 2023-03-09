const { Listner } = require('@simply-eat/common')

class ProductCreatedListner extends Listner {

    getSubject() { return 'product:created' }

    onMessage(data, msg) {
        console.log("Inside onMessage : ", data)
        msg.ack();
    }
}

module.exports = ProductCreatedListner