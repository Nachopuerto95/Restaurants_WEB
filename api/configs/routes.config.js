const express = require('express');
const router = express.Router();
const restaurants = require('../controllers/restaurants.controller')
const comments = require('../controllers/comments.controller')
const users = require('../controllers/users.controller')

// Restaurants
router.post('/restaurants', restaurants.create)
router.get('/restaurants', restaurants.list)
router.get('/restaurants/:id', restaurants.detail)
router.patch('/restaurants/:id', restaurants.update)
router.delete('/restaurants/:id', restaurants.delete)

// Coments
router.post('/restaurants/:id/comments', comments.create)
router.get('/restaurants/:id/comments', comments.list)

// Users
router.post('/users', users.create)


module.exports = router;

