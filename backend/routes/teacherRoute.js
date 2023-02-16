const { Router } = require('express');
const controllers = require('../controllers/teacher.js');
const middleware = require("../middleware/authUser.js")
const router = Router()

router.get('/teachers',  controllers.getTeachers)
router.get('/teachers/:id',  controllers.getTeacherById)
router.post('/teachers',  controllers.createTeacher)
router.patch('/teachers/:id',  controllers.updateTeacher)
router.delete('/teachers/:id',  controllers.deleteTeacher)

module.exports = router