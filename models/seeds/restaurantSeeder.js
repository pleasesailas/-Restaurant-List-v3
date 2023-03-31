const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
// 載入.json 資料
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('loading restaurantList done!')
      // db.close()
    })
    .catch(error => console.log(error))
})