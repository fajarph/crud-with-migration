const { Router } = require('express');
const controllers = require('../controllers');
const router = Router()
router.get('/', (req, res) => res.send('Hey Fajar'))
router.get('/countries', controllers.getCountries)
router.get('/horoscopes', controllers.getHoroscopes)
router.get('/hobbies', controllers.getHobbies)
router.get('/users', controllers.getUser)
router.get('/users/:id', controllers.getUserById)
router.post('/users', controllers.createUser)
router.patch('/users/:id', controllers.updateUser)
router.delete('/users/:id', controllers.deleteUser)

module.exports = router