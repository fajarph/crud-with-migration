const { Student } = require("../models")

const getStudents = async(req, res) => {
    try {
        const response = await Student.findAll({
            attributes: ["name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "gender"]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getStudentById = async(req, res) => {
    try {
        const response = await Student.findOne({
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

const createStudent = async(req, res) => {
    const {name, email, age, CountryId, HoroscopeId, HobbyId, gender,} = req.body;
    try {
        await Student.create({
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

const updateStudent = async(req, res) => {
    try {
        await Student.update(req.body, {
            where:{
                id: req.params.id
            },
        });
        res.status(200).json({msg: "Student Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

const deleteStudent = async(req, res) => {
    try {
        await Student.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Deleted"});
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