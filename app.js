const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const routes = require('./routes')
const UsePassport = require('./config/passport')
const app = express()

// mongoose
require('./config/mongoose')
const port = process.env.PORT
// method-override
app.use(methodOverride('_method'))
// setting view engine
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting route for static
app.use(express.static('public'))
// flash
app.use(flash())
// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// passport
UsePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})
// routing
app.use(routes)

//listening
app.listen(port, () => {
  console.log(`Express is listening on http://localost:${port}`)
})


