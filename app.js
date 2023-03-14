const express = require('express')
const app = express()
const port = 3000
const exphdbs = require('express-handlebars')
const restaurant = require('./restaurant.json')
const restaurantList = restaurant.results

// setting view engine
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting route for static
app.use(express.static('public'))

// routing
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()

  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

//listening
app.listen(port, () => {
  console.log(`Express is listening on http://localost:${port}`)
})