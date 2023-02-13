const { Teacher } = require("../models")

const getTeachers = async(req, res) => {
    try {
        const response = await Teacher.findAll({
            attributes: ["name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "course", "gender"]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getTeacherById = async(req, res) => {
    try {
        const response = await Teacher.findOne({
            attributes:["name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "course", "gender"],
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
    const {name, email, age, CountryId, HoroscopeId, HobbyId, course, gender,} = req.body;
    try {
        await Teacher.create({
            name: name,
            email: email,
            age: age,
            CountryId: CountryId,
            HoroscopeId: HoroscopeId,
            HobbyId: HobbyId,
            course: course,
            gender: gender
        })
        res.status(201).json({msg: "Teacher Created "})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const updateTeacher = async(req, res) => {
    try {
        await Teacher.update(req.body, {
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
    getTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}