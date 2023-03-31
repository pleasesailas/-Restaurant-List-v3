const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')


const Restaurant = require('./models/restaurant')
// mongoose
const mongoose = require('mongoose')
// const restaurant = require('./models/restaurant')

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

// Detail
app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//Update
app.get('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  return Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//Delete
app.post('/restaurants/:id/delete', (req, res) => {
  const { id } = req.params
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Search
app.get('/search', (req, res) => {
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

//listening
app.listen(port, () => {
  console.log(`Express is listening on http://localost:${port}`)
})


