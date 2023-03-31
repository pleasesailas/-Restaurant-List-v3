const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Search
router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  return Restaurant.find({})
    .lean()
    .then((restaurants) => {
      const results = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: results, keyword })
    })
    .catch(error => console.log(error))
})


module.exports = router