const { Router } = require('express');
const controllers = require('../controllers/students.js');
const middleware = require("../middleware/authUser.js")
const validation = require("../validation/student/student.validation.js")
const router = Router()

router.get('/students', middleware.verifyUser, controllers.getStudents)
router.get('/students/:id', middleware.verifyUser, controllers.getStudentById)
router.post('/students', middleware.verifyUser, validation.createStudent, controllers.createStudent)
router.patch('/students/:id', middleware.verifyUser, controllers.updateStudent)
router.delete('/students/:id', middleware.verifyUser, controllers.deleteStudent)

module.exports = router