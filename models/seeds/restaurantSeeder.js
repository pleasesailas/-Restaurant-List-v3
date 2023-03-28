const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
// 載入.json 資料
const restaurantList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!!!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('loading restaurantList done!')
      db.close()
    })
    .catch(error => console.log(error))
})