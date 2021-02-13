const express = require('express')
const mongoose =  require('mongoose')
const config = require('config')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors()) // Use this after the variable declaration
app.use('/api', require('./routes/order.routes'))

const PORT = process.env.PORT || config.get('port')

const start = async () => {
  try {
    // Подключаюсь к базе данных mongodb
    await mongoose.connect(config.get('db'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
   })
    app.listen(PORT, () => {
      console.log('server success starting', PORT)
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

start()