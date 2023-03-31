const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')
const routes = require('./routes')

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
// method-override
app.use(methodOverride('_method'))
// setting view engine
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting route for static
app.use(express.static('public'))

// routing
app.use(routes)


//listening
app.listen(port, () => {
  console.log(`Express is listening on http://localost:${port}`)
})


