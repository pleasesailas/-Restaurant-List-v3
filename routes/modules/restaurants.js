const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Detail
router.get('/:id', (req, res) => {
  const { id } = req.params
  const userId = req.user._id
  return Restaurant.findOne({ _id: id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//Update
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  const userId = req.user._id
  return Restaurant.findOne({ _id: id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const userId = req.user._id
  return Restaurant.findOneAndUpdate({ _id: id, userId }, { ...req.body, userId }, { new: true })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const userId = req.user._id
  return Restaurant.findOneAndDelete({ _id: id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router