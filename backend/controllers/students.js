const { Student, Country, Horoscope, Hobby } = require("../models")

const getStudents = async(req, res) => {
    try {
        const response = await Student.findAll({
            attributes: ["id", "name", "email", "age", "CountryId", "HoroscopeId", "HobbyId", "gender"],
            include: [
                {
                    model: Country,
                    attributes: ['id', 'name']
                },
                {
                    model: Horoscope,
                    attributes: ['id', 'name']
                },
                {
                    model: Hobby,
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getStudentById = async(req, res) => {
    try {
        const response = await Student.findOne({
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
    try {
        await Student.create(req.body);
        res.status(201).json({msg: "Students Created"});
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateStudent = async(req, res) => {
    try {
        await Student.update(req.body, {
            where:{
                id: req.params.id
            },
            include: [
                {
                    model: Country,
                    attributes: ['id', 'name']
                },
                {
                    model: Horoscope,
                    attributes: ['id', 'name']
                },
                {
                    model: Hobby,
                    attributes: ['id', 'name']
                }
            ]
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