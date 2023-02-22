const { Router } = require('express');
const controllers = require('../controllers/teacher.js');
const middleware = require("../middleware/authUser.js")
const validation = require("../validation/teacher/teacher.validation")
const router = Router()

router.get('/teachers', middleware.verifyUser, controllers.getTeachers)
router.get('/teachers/:id', middleware.verifyUser, controllers.getTeacherById)
router.post('/teachers', middleware.verifyUser, validation.createTeacher, controllers.createTeacher)
router.patch('/teachers/:id', middleware.verifyUser, controllers.updateTeacher)
router.delete('/teachers/:id', middleware.verifyUser, controllers.deleteTeacher)

module.exports = router