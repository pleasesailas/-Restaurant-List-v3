const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes')
const UsePassport = require('./config/passport')
const app = express()
const port = 3000

// mongoose
require('./config/mongoose')
// method-override
app.use(methodOverride('_method'))
// setting view engine
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting route for static
app.use(express.static('public'))
// session
app.use(session({
  secret:'This is mySecret',
  resave: false,
  saveUninitialized: true
}))
// passport
UsePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// routing
app.use(routes)

//listening
app.listen(port, () => {
  console.log(`Express is listening on http://localost:${port}`)
})


