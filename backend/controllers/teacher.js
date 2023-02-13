const { Teacher } = require("../models")

const getTeachers = async(req, res) => {
    try {
        const response = await Teacher.findAll({
            attributes: ["name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "gender"]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getTeacherById = async(req, res) => {
    try {
        const response = await Teacher.findOne({
            attributes:["name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "gender"],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createTeacher = async(req, res) => {
    const {name, email, age, CountryId, HoroscopeId, HobbyId, gender,} = req.body;
    try {
        await Teacher.create({
            name: name,
            email: email,
            age: age,
            CountryId: CountryId,
            HoroscopeId: HoroscopeId,
            HobbyId: HobbyId,
            gender: gender
        })
        res.status(201).json({msg: "Student Created "})
    } catch (error) {
        res.status(400).json({msg: "sial"})
    }
}

const updateTeacher = async(req, res) => {
    try {
        await Student.update(req.body, {
            where:{
                id: req.params.id
            },
        });
        res.status(200).json({msg: "Teacher Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

const deleteTeacher = async(req, res) => {
    try {
        await Teacher.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Teacher Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
}