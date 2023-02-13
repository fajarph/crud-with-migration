const { Router } = require('express');
const controllers = require('../controllers/users.js');
const middleware = require("../middleware/authUser.js")
const router = Router()

router.get('/', (req, res) => res.send('Hey Fajar'))
router.get('/countries', controllers.getCountries)
router.get('/horoscopes', controllers.getHoroscopes)
router.get('/hobbies', controllers.getHobbies)
router.get('/users',  controllers.getUsers)
router.get('/users/:id',  controllers.getUserById)
router.post('/users',  controllers.createUser)
router.patch('/users/:id', controllers.updateUser)
router.delete('/users/:id',  controllers.deleteUser)

module.exports = router