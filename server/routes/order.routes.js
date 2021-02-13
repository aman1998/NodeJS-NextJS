const { Router } = require('express')
const Order = require('../models/Order')
const router = Router()

// Добавление списка
router.post('/order', async (req, res) => {
  try {
    const { nameClient, type, status } = req.body
    const order = new Order({ nameClient, type, status })
    await order.save()

    return res.status(201).json({message: 'Success created!'})

  } catch (e) {
    res.status(500).json({message: 'error in create'})
  }
})

// Получение списка
router.get('/orders', async (req, res) => {
  try {
    let {searchClient, checkType, checkStatus, page, limit} = req.query
    let orders
    age = page || 2
    limit = limit || 3

    /*
      Если query содержит поисковый запрос клиента
      с указанием тип/статус то происходит фильтрация тип/статус и потом проверятся 
      есть ли в массиве слово из поиска
    */
    if(searchClient) {
      orders = await Order.find()
      if(checkType) {
        orders = orders.filter(order => order.type.includes(checkType))
        orders = orders.filter(order => order.nameClient.includes(searchClient))
      }
      if(checkStatus) {
        orders = orders.filter(order => order.status.includes(checkStatus))
        orders = orders.filter(order => order.nameClient.includes(searchClient))
        return res.json(orders)
      }
      orders = orders.filter(order => order.nameClient.includes(searchClient))
      return res.json(orders)
    }

    /*
      Если query содержит значение фильтра то 
      срабатывает условие которое возвращает массив с результатом
    */ 
    if(checkType || checkStatus) {
      orders = await Order.find()
      if(checkType) {
        orders = orders.filter(order => order.type.includes(checkType))
      }
      if(checkStatus) {
        orders = orders.filter(order => order.status.includes(checkStatus))
      }
      return res.json(orders)
    }
    orders = await Order.find()

    //  Пагинация
    // const startIndex = (page-1)*limit
    // const endIndex = page*limit
    // const pagination = orders.slice(startIndex, endIndex)
    // return res.json(pagination)

    return res.json(orders)

  } catch (e) {
    res.status(500).json({message: 'error in request'})
  }
})

module.exports = router