const { Router } = require('express');
const controllers = require('../controllers/students.js');
const middleware = require("../middleware/authUser.js")
const router = Router()

router.get('/students', controllers.getStudents)
router.get('/students/:id', controllers.getStudentById)
router.post('/students',  controllers.createStudent)
router.patch('/students/:id', controllers.updateStudent)
router.delete('/students/:id', controllers.deleteStudent)

module.exports = router