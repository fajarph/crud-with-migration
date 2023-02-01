const { Router } = require('express');
const controllers = require('../controllers');
const router = Router()
router.get('/', (req, res) => res.send('Hey Fajar'))
router.get('/users', controllers.getUser)
router.get('/users/:id', controllers.getUserById)
router.post('/users', controllers.createUser)
router.patch('/users/:id', controllers.updateUser)
router.delete('/users/:id', controllers.deleteUser)

module.exports = router