const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const restaurantList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]


db.once('open', () => {
  //create users
    const userPromises = SEED_USER.map((user) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then((createdUser) => {
          //產生的User index為0 取得前3筆，反之取得後3筆餐廳資料
          const restaurants = user === SEED_USER[0] ? restaurantList.slice(0, 3) : restaurantList.slice(3, 6)
          const userRestaurants = restaurants.map((restaurant) => ({
            ...restaurant, userId: createdUser._id
          }))
          return Restaurant.create(userRestaurants)
        })
    })

    Promise.all(userPromises)
      .then (() => {
        console.log('All done!')
        process.exit()
      })
      .catch(error => console.log(error))
})