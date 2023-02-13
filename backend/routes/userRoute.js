const { Router } = require('express');
const controllers = require('../controllers/users.js');
const middleware = require("../middleware/authUser.js")
const router = Router()

router.get('/', (req, res) => res.send('Hey Fajar'))
router.get('/countries', controllers.getCountries)
router.get('/horoscopes', controllers.getHoroscopes)
router.get('/hobbies', controllers.getHobbies)
router.get('/users', middleware.verifyUser, middleware.adminOnly, controllers.getUsers)
router.get('/users/:id', middleware.verifyUser, middleware.adminOnly, controllers.getUserById)
router.post('/users', middleware.verifyUser, middleware.adminOnly, controllers.createUser)
router.patch('/users/:id',middleware.verifyUser, middleware.adminOnly, controllers.updateUser)
router.delete('/users/:id', middleware.verifyUser, middleware.adminOnly, controllers.deleteUser)

module.exports = router