const express = require('express')
const exphdbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
// mongoose
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!!!')
})
db.once('open', () => {
  console.log('mongoose connected!')
})

const app = express()
const port = 3000

// setting view engine
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting route for static
app.use(express.static('public'))

// routing
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
// Create
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const newData = req.body
  Restaurant.create(newData)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
  // const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant: restaurant })
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


