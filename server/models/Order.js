const {Schema, model} = require('mongoose')

const Order = new Schema({
  nameClient: {type: String, required: true},
  type: {type: String, required: true},
  status: {type: String, required: true},
  date: {type: Date, default: Date.now},
})

module.exports = model('Order', Order)